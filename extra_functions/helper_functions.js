// Write a function to create a variable with just the image names, so it can be passed to jsPsychInit for preloading
function only_names(array) {

    var new_array = [];

    for (iName = 0; iName < array.length; iName++){
        new_array[iName] = array[iName].image;
    }

    return new_array;

};

// Define a function that could filter an array by indices
function index_into_array(array,indices){
    
    var filtered_array = [];

    for(i=0; i<indices.length; i++){
        filtered_array[i] = deepCopy(array[indices[i]]);
    };

    return filtered_array;

};

// A custom shuffle function
function shuffle(array) {
    
    for(let i = array.length - 1; i > 0; i--){

        const j = Math.floor(Math.random() * i);
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;

};

return array;

};

//  Add trial indices to the arrays
function add_image_info_and_trial_session_idxs(array,session_idx,subjOrder,subjSpace) {

    for (iE = 0; iE < array.length; iE++){
        
        if (jatos.studySessionData.show_correct == 1){
          array[iE].image = "./img/" + subjSpace + "/pair_imgs_correct_responses/" + subjOrder + "/" + array[iE].image;
        } else {
          array[iE].image = "./img/" + subjSpace + "/pair_imgs/" + subjOrder + "/" + array[iE].image;
        }
        
        array[iE].trial = iE + 1;
        array[iE].session = session_idx;
        // console.log(array[iE]);
    };

    return array;
};

//  Add trial indices to the arrays
function add_image_info_and_trial_session_idxs_practice_trials(array,session_idx,subjOrder,subjSpace) {

  for (iE = 0; iE < array.length; iE++){
      
      array[iE].image = "./img/" + subjSpace + "/example_imgs/" + array[iE].image;
      array[iE].trial = iE + 1;
      array[iE].session = session_idx;
      // console.log(array[iE]);
  };

  return array;

};    

const trialCreator = function(curr_space_object,baseTrialArray,basic_parameters,iPhase,iSession){

    // What phase is this?
    let phase_string = 'phase_' + iPhase

    // Shuffle the base trial array
    let baseTrialArrayInner = deepCopy(shuffle(baseTrialArray))

    // Populate the baseTrialArrayInner with details for each trial
    for(i = 0, j = 0; i < baseTrialArrayInner.length; i++, j+=2) {

      // Randomize item1 and item2
      if (i % 2 == 0){
          [baseTrialArrayInner[i].item1, baseTrialArrayInner[i].item2] = [baseTrialArrayInner[i].item2, baseTrialArrayInner[i].item1]               
      }

      // Which one is the prompt item? If one of them is empty, prompt is the non-empty. Else, determine randomly
      if (baseTrialArrayInner[i].item1.includes('E')){
          baseTrialArrayInner[i].prompt_item_idx = 2
      } else if (baseTrialArrayInner[i].item2.includes('E')){
          baseTrialArrayInner[i].prompt_item_idx = 1
      } else {
          // Choose randomly
          baseTrialArrayInner[i].prompt_item_idx = Math.floor(Math.random()*1) + 1
      }
      // Choose as foil the other one   
      if (baseTrialArrayInner[i].prompt_item_idx == 1){
          baseTrialArrayInner[i].foil_item_idx = 2
      } else {
          baseTrialArrayInner[i].foil_item_idx = 1
      }

      // img names and paths for items. Also point names
      baseTrialArrayInner[i].item_img_names  = []
      baseTrialArrayInner[i].item_img_paths  = []
      baseTrialArrayInner[i].item_point_idxs = []
      
      for (k=0; k<2; k++){

        let itemString = 'item'+(k+1)
        let pointName = baseTrialArrayInner[i][itemString]
        let pointNameIdx = basic_parameters.pointNamesUsed[phase_string].indexOf(pointName)

        baseTrialArrayInner[i].item_img_names[k]  = basic_parameters.imgNamesUsed[phase_string][pointNameIdx] 
        baseTrialArrayInner[i].item_img_paths[k]  = './img/targets/' + baseTrialArrayInner[i].item_img_names[k] + '.png'
        baseTrialArrayInner[i].item_point_idxs[k] = basic_parameters.pointNamesUsed[phase_string].indexOf(pointName)+1
      }

      // point name of the prompt item?
      baseTrialArrayInner[i].prompt_point_name = baseTrialArrayInner[i]["item" + baseTrialArrayInner[i].prompt_item_idx]
      // target name of the prompt item?
      baseTrialArrayInner[i].prompt_img_name = 
          basic_parameters.imgNamesUsed[phase_string][basic_parameters.pointNamesUsed[phase_string].indexOf(baseTrialArrayInner[i].prompt_point_name)]
      // prompt img path?
      baseTrialArrayInner[i].prompt_img_path = './img/targets/' + baseTrialArrayInner[i].prompt_img_name + '.png'
      // point name of the foil item?
      baseTrialArrayInner[i].foil_point_name = baseTrialArrayInner[i]["item" + baseTrialArrayInner[i].foil_item_idx]
      // target name of the foil item?
      baseTrialArrayInner[i].foil_img_name = 
          basic_parameters.imgNamesUsed[phase_string][basic_parameters.pointNamesUsed[phase_string].indexOf(baseTrialArrayInner[i].foil_point_name)]
      // foil img path?
      baseTrialArrayInner[i].foil_img_path = './img/targets/' + baseTrialArrayInner[i].foil_img_name + '.png'
      // Exemplar img to load?
      baseTrialArrayInner[i].ex_pairs_img_path = './img/' + curr_space_object.concept_space + '/pair_imgs_both_orders/pairs_' + 
              baseTrialArrayInner[i].item_point_idxs[0] + '_' + baseTrialArrayInner[i].item_point_idxs[1] + '.png'            
      // baseTrialArrayInner[i].ex_pairs_img_path = './img/' + curr_space_object.concept_space + '/pair_imgs_both_orders/pairs_16_16.png'                

      // Record the phase and session
      baseTrialArrayInner[i].phase   = iPhase
      baseTrialArrayInner[i].session = iSession        

    }  

    // Shuffle once again, otherwise prompt item location is predictable 
    baseTrialArrayInner = deepCopy(shuffle(baseTrialArrayInner))

    return baseTrialArrayInner
}; // function trialCreator

const calcRunningPerf = function(data) {
    
    [curr_phase,phase_string,curr_session] = getPhaseAndSession()
    let curr_trials

    if (jatos.componentPos == jatos.studySessionData.script_comp_pos.practice_trials){
        curr_trials = deepCopy(
            jatos.studySessionData.outputData[phase_string+'_practice_results'])
    } else {
        curr_trials = deepCopy(
            jatos.studySessionData.outputData[phase_string+'_results'][curr_session-1])
    }

    curr_trials = curr_trials.slice(0,data.trial_index+1)
    let curr_prompt_path = curr_trials[data.trial_index].prompt_img_path

    // Find  trials with this image:
    let last_prompt_trials = curr_trials.filter(function(curr_trials){
        return curr_trials.prompt_img_path == curr_prompt_path
    })

    if (last_prompt_trials.length > jatos.studySessionData.perf_check_over_n_trials){
        // So we have more than 10 entries. Get only the last 10 trials
        last_prompt_trials = last_prompt_trials.slice(last_prompt_trials.length - jatos.studySessionData.perf_check_over_n_trials, last_prompt_trials.length)
    }
    // Calculate the average
    let avg = last_prompt_trials.reduce(function(total, item){
        return total + item.correct
    },0)
    avg = avg / last_prompt_trials.length

    // Record this avg value
    let idx_of_score_box_target = jatos.studySessionData.inputData.basic_parameters.targetPathsUsed[phase_string].indexOf(curr_prompt_path)
    jatos.studySessionData.inputData.running_perf[phase_string][curr_session-1][idx_of_score_box_target] = avg * 100
};

const getPhaseAndSession = function(){
    let curr_phase   = jatos.studySessionData.phase_counter; 
    let phase_string = 'phase_' + curr_phase;
    let curr_session = jatos.studySessionData.session_counter;

    return [curr_phase, phase_string, curr_session[phase_string]];
};

const createScoreBox = function(){

    // What phase is this?
    let [curr_phase,phase_string,curr_session] = getPhaseAndSession()
    
    // Get the score box details locally
    let local_score_box_info = jatos.studySessionData.inputData.basic_parameters.targetPathsUsed
    let running_perf         = jatos.studySessionData.inputData.running_perf[phase_string][curr_session-1].map(item => Math.round(item))


    let img_names = jatos.studySessionData.inputData.basic_parameters.targetNamesUsed[phase_string]
    let img_paths = local_score_box_info[phase_string]

    let gaps_col      = 30; // gap between items in the box
    let target_width  = jatos.studySessionData.inputData.basic_parameters.score_box_target_width
    let target_height = jatos.studySessionData.inputData.basic_parameters.score_box_target_height;

    let score_font_size      = jatos.studySessionData.inputData.basic_parameters.score_box_score_font_size
    let your_score_font_size = jatos.studySessionData.inputData.basic_parameters.score_box_description_font_size

    let nTargets        = jatos.studySessionData.inputData.basic_parameters.nTargets
    let score_box_width = nTargets * target_width + nTargets*gaps_col

    // Create the main grid element
    let score_box = document.createElement('div')
    score_box.className = 'wrapper'
    score_box.style = 
        'display: grid;' + 
        'grid-gap: 0px '+ gaps_col + 'px;' +
        'grid-template-columns: repeat(' + img_paths.length +', '+ target_width + 'px);' +
        'background-color: #fff;' +
        'text-align: center;' +
        'place-items: center center;' +
        'border: 2px solid #444;' + 
        'width: '+score_box_width+'px;' +
        'place-content: center center;' 
        
    let box_header = document.createElement('div')
    box_header.innerText = 'Your Scores:'
    box_header.className = 'box_header'
    box_header.style = 
        'grid-column: 1 / ' + (nTargets+1) + ';' + 
        'grid-row: 1;' +
        'text-align: center;' +
        'font-weight: bold;' + 
        'font-size: '+your_score_font_size+'px;'           

    score_box.appendChild(box_header)

    // Add target names
    for (iN of img_names){
        let iName = document.createElement('P')
        iName.className = 'score_box_target_name'
        iName.innerText = iN
        iName.style.margin = '0'


        score_box.appendChild(iName)
    }

    // Add the images 
    for (iT of img_paths){
    
        let iTarget = document.createElement('img')
        iTarget.className = 'score_box_targets'
        iTarget.src = iT
        // iTarget.style.width = target_width
        // iTarget.style.height = target_height    
        iTarget.style = 'width: ' + target_width + 'px; height: ' + target_height + 'px;'        

        score_box.appendChild(iTarget)
    }    

    // Add your scores
    for (iS of running_perf){
        let iPerf = document.createElement('P')
        iPerf.className = 'score_box_perf'
        iPerf.innerText = iS + '%'
        iPerf.style.margin = '0'

        score_box.appendChild(iPerf)
    } 
    // document.body.appendChild(score_box)
    return score_box
};

const deepCopy = function(object){
    return JSON.parse(JSON.stringify(object))
};

const createImageSurveyTrial = function(preamble,imageElementArray, questions){
    
    let html = ''

    // Add image elements
    for (iImg=0; iImg < imageElementArray.length; iImg++){
        html += imageElementArray[iImg].outerHTML
    }

    // add questions
    for (i = 0; i < questions.length; i++) {
        let question = questions[i];

        html += '<div id="jspsych-survey-text-'+i+'" class="jspsych-survey-text-question" style="margin: 2em 0em;">';
        html += '<p class="jspsych-survey-text">' + question.prompt + '</p>';
        let autofocus = i == 0 ? "autofocus" : "";
        let req = question.required ? "required" : "";
        if(question.rows == 1){
            html += '<input type="text" id="input-'+i+'"  name="#jspsych-survey-text-response-' + i + '" data-name="'+question.name+'" size="'+question.columns+'" '+autofocus+' '+req+' placeholder="'+question.placeholder+'"></input>';
        } else {
            html += '<textarea id="input-'+i+'" name="#jspsych-survey-text-response-' + i + '" data-name="'+question.name+'" cols="' + question.columns + '" rows="' + question.rows + '" '+autofocus+' '+req+' placeholder="'+question.placeholder+'"></textarea>';
        }
        html += '</div>';
    }

    var spatialLayoutTrial = {
        type: 'survey-html-form',
        preamble: preamble,
        html: html
    };        
    return spatialLayoutTrial
};