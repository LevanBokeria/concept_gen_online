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
        
        if (jatos.studySessionData.show_correct){
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

    // For trials with both exemplars being associated with toys:
    // Make sure which one is the prompt item is evenly spread
    // So, create an array to record which one has already been used.
    let targetUsedAsPrompt = new Array(jatos.studySessionData.inputData.basic_parameters.nTargets).fill(0)
    
    // What are the names of the target points used for this session? Define in a temp variable for convenience.
    let targetPointNames = jatos.studySessionData.inputData.basic_parameters.targetPointNames[phase_string]
    
    // Populate the baseTrialArrayInner with details for each trial
    for(i = 0, j = 0; i < baseTrialArrayInner.length; i++, j+=2) {

      // Randomize item1 and item2
      if (i % 2 == 0){
          [baseTrialArrayInner[i].item1, baseTrialArrayInner[i].item2] = [baseTrialArrayInner[i].item2, baseTrialArrayInner[i].item1]               
      }

      // Which one is the prompt item? If one of them is empty, prompt is the non-empty. Else, determine evenly
      if (baseTrialArrayInner[i].item1.includes('E')){
          baseTrialArrayInner[i].prompt_item_idx = 2
      } else if (baseTrialArrayInner[i].item2.includes('E')){
          baseTrialArrayInner[i].prompt_item_idx = 1
      } else {
        // Choose evenly

        //   Has the first one been a prompt already? If not, make it. If yes, make the other one.
        let idx_of_item1 = targetPointNames.indexOf(baseTrialArrayInner[i].item1)
        let idx_of_item2 = targetPointNames.indexOf(baseTrialArrayInner[i].item2)        

        if (targetUsedAsPrompt[idx_of_item1] == 0){
           
            baseTrialArrayInner[i].prompt_item_idx = 1

            // Remember it has been used:
            targetUsedAsPrompt[idx_of_item1] = 1
        } else if(targetUsedAsPrompt[idx_of_item2] == 0) {
           
            baseTrialArrayInner[i].prompt_item_idx = 2

            // Remember it has been used:
            targetUsedAsPrompt[idx_of_item2] = 1
        } else {
            // Throw an error
            console.error('Both items already used as prompts!')
        }

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
        baseTrialArrayInner[i].item_img_paths[k]  = './img/targets/' + baseTrialArrayInner[i].item_img_names[k] + '.jpg'
        baseTrialArrayInner[i].item_point_idxs[k] = basic_parameters.pointNamesUsed[phase_string].indexOf(pointName)+1
      }

      // point name of the prompt item?
      baseTrialArrayInner[i].prompt_point_name = baseTrialArrayInner[i]["item" + baseTrialArrayInner[i].prompt_item_idx]
      // target name of the prompt item?
      baseTrialArrayInner[i].prompt_img_name = 
          basic_parameters.imgNamesUsed[phase_string][basic_parameters.pointNamesUsed[phase_string].indexOf(baseTrialArrayInner[i].prompt_point_name)]
      // prompt img path?
      baseTrialArrayInner[i].prompt_img_path = './img/targets/' + baseTrialArrayInner[i].prompt_img_name + '.jpg'
      // point name of the foil item?
      baseTrialArrayInner[i].foil_point_name = baseTrialArrayInner[i]["item" + baseTrialArrayInner[i].foil_item_idx]
      // target name of the foil item?
      baseTrialArrayInner[i].foil_img_name = 
          basic_parameters.imgNamesUsed[phase_string][basic_parameters.pointNamesUsed[phase_string].indexOf(baseTrialArrayInner[i].foil_point_name)]
      // foil img path?
      baseTrialArrayInner[i].foil_img_path = './img/targets/' + baseTrialArrayInner[i].foil_img_name + '.jpg'
      // Exemplar img to load?
      baseTrialArrayInner[i].ex_pairs_img_path = './img/' + curr_space_object.concept_space + '/pair_imgs_both_orders/pairs_' + 
              baseTrialArrayInner[i].item_point_idxs[0] + '_' + baseTrialArrayInner[i].item_point_idxs[1] + '.png'            
      // baseTrialArrayInner[i].ex_pairs_img_path = './img/' + curr_space_object.concept_space + '/pair_imgs_both_orders/pairs_16_16.png'                

      // Record the phase and session
      baseTrialArrayInner[i].phase        = iPhase
      baseTrialArrayInner[i].session      = iSession        
      baseTrialArrayInner[i].running_perf = new Array(basic_parameters.nTargets).fill(0)

    }  

    // Shuffle once again, otherwise prompt item location is predictable 
    baseTrialArrayInner = deepCopy(shuffle(baseTrialArrayInner))

    return baseTrialArrayInner
}; // function trialCreator

const calcRunningPerf = function(data) {
    // DESCRIPTION

    // This function is called at the end of each trial by the plugin.
    // Calculates the current running performance on each target, taking into account latest trial
    // Also, it updates the global_trial_counter and the session_trial_counters
    
    [curr_phase,phase_string,curr_session,curr_global_trial] = getPhaseAndSession()
    let curr_session_trials

    // Add the current trial data to the outputData object
    data.session      = curr_session
    data.phase        = curr_phase
    data.global_trial = curr_global_trial
    
    // Add data from this trial to the outputData object
    jatos.studySessionData.outputData.phase_results[curr_global_trial-1] = 
        Object.assign(jatos.studySessionData.outputData.phase_results[curr_global_trial-1],
            data)
    
    // Get all the trials of this particular session
    curr_session_trials = deepCopy(
        jatos.studySessionData.outputData.phase_results.filter(item => item.session == curr_session && item.phase == curr_phase))

    curr_session_trials = curr_session_trials.slice(0,data.trial_index+1)
    let curr_prompt_path = curr_session_trials[data.trial_index].prompt_img_path

    // Find  trials with this image:
    let last_prompt_trials = curr_session_trials.filter(function(curr_session_trials){
        return curr_session_trials.prompt_img_path == curr_prompt_path
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
    debugger
    let curr_running_perf = []
    if (jatos.studySessionData.session_trial_counter == 1){
        curr_running_perf = deepCopy(jatos.studySessionData.outputData.phase_results[jatos.studySessionData.global_trial_counter-1].running_perf)
    } else {
        curr_running_perf = deepCopy(jatos.studySessionData.outputData.phase_results[jatos.studySessionData.global_trial_counter-2].running_perf)
    }

    let idx_of_score_box_target = jatos.studySessionData.inputData.basic_parameters.targetPathsUsed[phase_string].indexOf(curr_prompt_path)

    curr_running_perf[idx_of_score_box_target] = avg * 100
    
    jatos.studySessionData.outputData.phase_results[jatos.studySessionData.global_trial_counter-1].running_perf = deepCopy(curr_running_perf)

    // update the global trial counter
    jatos.studySessionData.global_trial_counter++
    jatos.studySessionData.session_trial_counter++

};

const getPhaseAndSession = function(){
    let curr_phase   = jatos.studySessionData.phase_counter; 
    let phase_string = 'phase_' + curr_phase;
    let curr_global_trial   = jatos.studySessionData.global_trial_counter

    let curr_session
    
    // If practice is currently ongoing, or the haven't reached the phase_pa component, then curr_session = 'practice'
    if (jatos.componentProperties.title.includes('practice') ||
        jatos.componentPos < jatos.studySessionData.script_comp_pos.phase_pa){
        // curr_session = 'practice'
        curr_session = -1
    } else {
        curr_session = jatos.studySessionData.session_counter[phase_string];
    }

    return [curr_phase, phase_string, curr_session, curr_global_trial];
};

const createScoreBox = function(){
    
    // What phase is this?
    let [curr_phase,phase_string,curr_session,curr_global_trial] = getPhaseAndSession()
    
    if (jatos.componentPos == jatos.studySessionData.script_comp_pos.practice_trials){ 
        phase_string_for_running_perf = phase_string + '_practice'
    }

    // Get the score box details locally
    let local_score_box_info = jatos.studySessionData.inputData.basic_parameters.targetPathsUsed

    let running_perf
    // If its the very first trial of a session, then set the scores to 0
    if (jatos.studySessionData.session_trial_counter == 1){
        running_perf = new Array(jatos.studySessionData.inputData.basic_parameters.nTargets).fill(0)
    } else {
        // If not, then use the performance of the previous trial to be displayed
        running_perf = jatos.studySessionData.outputData.phase_results[curr_global_trial-2].running_perf.map(item => Math.round(item))
    }

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
    score_box.className = 'score_box'
    score_box.id        = 'score_box_wrapper'
    score_box.style     = 
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

const createImageSurveyTrial = function(preamble,imageElementArray, questions,tag){
    
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
        html: html,
        data: tag,
    };        
    return spatialLayoutTrial
};