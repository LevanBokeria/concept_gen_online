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
        filtered_array[i] = JSON.parse(JSON.stringify(array[indices[i]]));
        filtered_array[i].trial = i + 1;
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

let trialCreator = function(curr_space_object,baseTrialArray,targetCoordsNames,iPhase,iSession){

    // Shuffle the base trial array
    let baseTrialArrayInner = JSON.parse(JSON.stringify(shuffle(baseTrialArray)))

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
      if (baseTrialArrayInner[i].prompt_item_idx == 1){
          baseTrialArrayInner[i].foil_item_idx = 2
      } else {
          baseTrialArrayInner[i].foil_item_idx = 1
      }

      // img names and paths for items. Also point names
      baseTrialArrayInner[i].item_img_names  = []
      baseTrialArrayInner[i].item_img_paths  = []
      baseTrialArrayInner[i].item_point_idxs = []
    //   debugger
      for (k=0; k<2; k++){
          baseTrialArrayInner[i].item_img_names[k]  = targetCoordsNames.imgNamesUsed['phase_'+iPhase][targetCoordsNames.pointNamesUsed['phase_'+iPhase].indexOf(baseTrialArrayInner[i]['item'+(k+1)])] 
          baseTrialArrayInner[i].item_img_paths[k]  = './img/targets/' + baseTrialArrayInner[i].item_img_names[k] + '.png'
          baseTrialArrayInner[i].item_point_idxs[k] = targetCoordsNames.pointNamesUsed['phase_'+iPhase].indexOf(baseTrialArrayInner[i]['item'+(k+1)])+1
      }

      // point name of the prompt item?
      baseTrialArrayInner[i].prompt_point_name = baseTrialArrayInner[i]["item" + baseTrialArrayInner[i].prompt_item_idx]
      // target name of the prompt item?
      baseTrialArrayInner[i].prompt_img_name = 
          targetCoordsNames.imgNamesUsed['phase_'+iPhase][targetCoordsNames.pointNamesUsed['phase_'+iPhase].indexOf(baseTrialArrayInner[i].prompt_point_name)]
      // prompt img path?
      baseTrialArrayInner[i].prompt_img_path = './img/targets/' + baseTrialArrayInner[i].prompt_img_name + '.png'
      // point name of the foil item?
      baseTrialArrayInner[i].foil_point_name = baseTrialArrayInner[i]["item" + baseTrialArrayInner[i].foil_item_idx]
      // target name of the foil item?
      baseTrialArrayInner[i].foil_img_name = 
          targetCoordsNames.imgNamesUsed['phase_'+iPhase][targetCoordsNames.pointNamesUsed['phase_'+iPhase].indexOf(baseTrialArrayInner[i].foil_point_name)]
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
    baseTrialArrayInner = JSON.parse(JSON.stringify(shuffle(baseTrialArrayInner)))

    return baseTrialArrayInner
}; // function trialCreator

const calcRunningPerf = function(data) {

    // Calculate the running             
    let curr_phase     = jatos.studySessionData.phase_counter
    let curr_session   = jatos.studySessionData.session_counter['phase_'+curr_phase]
    let curr_trials
    if (jatos.componentPos == jatos.studySessionData.script_comp_pos.practice_trials){
        curr_trials = JSON.parse(JSON.stringify(
            jatos.studySessionData.outputData['phase_'+curr_phase+'_practice_results']))
    } else {
        curr_trials = JSON.parse(JSON.stringify(
            jatos.studySessionData.outputData['phase_'+curr_phase+'_results'][curr_session-1]))
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
    // debugger
    // Calculate the average
    let avg = last_prompt_trials.reduce(function(total, item){
        return total + item.correct
    },0)
    avg = avg / last_prompt_trials.length

    // Record this avg value
    let idx_of_score_box_target = jatos.studySessionData.inputData.score_box_target_paths['phase_'+curr_phase].indexOf(curr_prompt_path)
    jatos.studySessionData.inputData.score_box_target_paths.running_perf[idx_of_score_box_target] = avg * 100
};

// Define a function to do the checks
const session_qc_check = function(last_session_data,curr_session){
    
    // 1. Not too many missed trials
    let n_missed_trials    = last_session_data.filter(item => item.rt==null).length
    let perc_missed_trials = n_missed_trials * 100 / last_session_data.length

    if (perc_missed_trials >= jatos.studySessionData.qc_criteria.perc_max_missed){
        jatos.studySessionData.qc_status.perc_max_missed_pass = false
        jatos.studySessionData.qc_status.global_pass          = false            
    }

    // 2. Not too many fast trials
    let n_fast_trials    = last_session_data.filter(item => item.rt < jatos.studySessionData.qc_criteria.rt_min_speed).length
    let perc_fast_trials = n_fast_trials * 100 / last_session_data.length

    if (perc_fast_trials >= jatos.studySessionData.qc_criteria.rt_min_perc){
        jatos.studySessionData.qc_status.rt_pass     = false
        jatos.studySessionData.qc_status.global_pass = false            
    }

    // 3. Not too many similar responses

    // Get the bin counts
    let bin_counts = [];
    let responded_trials = last_session_data.filter(item => item.rt !== null);

    // debugger
    for (iElement = 0; iElement < jatos.studySessionData.inputData.choices.length; iElement++){
        bin_counts[iElement] = responded_trials.filter(item => item.key_press == ['49','50'][iElement]).length;
    }
    let max_count = Math.max(...bin_counts);
    let max_perc = max_count * 100 / responded_trials.length

    if (max_perc >= jatos.studySessionData.qc_criteria.uniform_resp_perc){

        jatos.studySessionData.qc_status.global_pass            = false;
        jatos.studySessionData.qc_status.uniform_resp_perc_pass = false;

    }

    // 4. If session >= 2, check better than chance
    if (curr_session >= 2){

        let n_targets_above_chance = 
        jatos.studySessionData.inputData.score_box_target_paths.running_perf.filter(item => item > 
            jatos.studySessionData.qc_criteria.min_perf_check_perc).length

        if (n_targets_above_chance < jatos.studySessionData.inputData.basic_parameters.nTargets) {
        jatos.studySessionData.qc_status.global_pass   = false;
        jatos.studySessionData.qc_status.min_perf_pass = false;
        }
    }
}; // end of the function session_qc_check

let getPhaseAndSession = function(){
    let curr_phase   = jatos.studySessionData.phase_counter; 
    let phase_string = 'phase_' + curr_phase;
    let curr_session = jatos.studySessionData.session_counter;

    return [curr_phase, phase_string, curr_session[phase_string]];
};

const createScoreBox = function(){
    // debugger
    // What phase is this?
    let [curr_phase,phase_string,curr_session] = getPhaseAndSession()

    // Get the score box details locally
    let local_score_box_info = jatos.studySessionData.inputData.score_box_target_paths
    let running_perf = local_score_box_info.running_perf


    let img_names = jatos.studySessionData.inputData.targetCoordsNames.targetNamesUsed[phase_string]
    let img_paths = local_score_box_info[phase_string]

    let gaps_col      = 20; // gap between items in the box
    let target_width  = jatos.studySessionData.inputData.basic_parameters.score_box_target_width
    let target_height = jatos.studySessionData.inputData.basic_parameters.score_box_target_height;

    let score_font_size = jatos.studySessionData.inputData.basic_parameters.score_box_score_font_size
    let your_score_font_size = jatos.studySessionData.inputData.basic_parameters.score_box_description_font_size

    let nTargets = jatos.studySessionData.inputData.basic_parameters.nTargets

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

        score_box.appendChild(iPerf)
    } 
    debugger
    // document.body.appendChild(score_box)
    return score_box
};