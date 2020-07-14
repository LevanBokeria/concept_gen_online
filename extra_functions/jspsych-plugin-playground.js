/*
 * Example plugin template
 */

jsPsych.plugins["plugin-playground"] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('plugin-playground', 'stimuli', 'image');

  plugin.info = {
    name: "plugin-playground",
    description: "",
    parameters: {
      target_stimulus: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Target',
        default: undefined,
        array: true,
        description: 'Target stimulu to display.'
      },      
      target_stim_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus height',
        default: 100,
        description: 'Height of images in pixels.'
      },
      target_stim_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus width',
        default: 100,
        description: 'Width of images in pixels'
      },
      target_stim_x_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus x coordinates',
        default: 100,
        description: 'X coordinate of images.'
      },
      target_stim_y_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus y coordinates',
        default: 100,
        description: 'Y coordinates of images'
      },
      sort_area_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Sort area height',
        default: 800,
        description: 'The height of the container that subjects can move the stimuli in.'
      },
      sort_area_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Sort area width',
        default: 800,
        description: 'The width of the container that subjects can move the stimuli in.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'It can be used to provide a reminder about the action the subject is supposed to take.'
      },
      prompt_location: {
        type: jsPsych.plugins.parameterType.SELECT,
        pretty_name: 'Prompt location',
        options: ['above','below'],
        default: 'above',
        description: 'Indicates whether to show prompt "above" or "below" the sorting area.'
      },
      trial_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Trial duration',
        default: null,
        description: 'How long to show trial before it ends.'
      }      
    } // parameters
  } // plugin.info

  plugin.trial = function(display_element, trial) {

    var html = "";
    // // check if there is a prompt and if it is shown above
    // if (trial.prompt !== null && trial.prompt_location == "above") {
    //   html += trial.prompt;
    // }

    html += '<div '+
      'id="jspsych-free-sort-arena" '+
      'class="jspsych-free-sort-arena" '+
      'style="position: relative; width:'+trial.sort_area_width+'px; height:'+trial.sort_area_height+'px; border:2px solid #444;"'+
      '></div>';

    // // check if prompt exists and if it is shown below
    // if (trial.prompt !== null && trial.prompt_location == "below") {
    //   html += trial.prompt;
    // }

    display_element.innerHTML = html;

    // store initial location data
    var init_locations = [];

    // ADD PROMPT 
    const prompt = document.createElement('P')
    prompt.innerText = trial.prompt
    display_element.querySelector("#jspsych-free-sort-arena").appendChild(prompt)

    // ADD TARGET IMAGE
    const target_image = document.createElement('img')
    target_image.src = trial.target_stimulus
    target_image.dataset.src = trial.target_stimulus

    display_element.querySelector("#jspsych-free-sort-arena").appendChild(target_image)

    target_image.width = trial.target_stim_width
    target_image.height = trial.target_stim_height

    target_image.style = 'position: absolute; top:' + trial.target_stim_y_coords + 'px; left:' + trial.target_stim_x_coords + 'px;'

    ////////////////////////////////////////////////////////////////////
    // store response
    var response = {
      rt: null,
      key: null
    };

    // ////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////

    // function to handle responses by the subject
    var after_response = function(info) {

      // only record the first response
      if (response.key == null) {
        response = info;
      }

      if (trial.response_ends_trial) {
        end_trial();
      }
    };

    // function to end trial when it is time
    var end_trial = function() {

      // kill any remaining setTimeout handlers
      jsPsych.pluginAPI.clearAllTimeouts();

      // kill keyboard listeners
      if (typeof keyboardListener !== 'undefined') {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboardListener);
      }

      // gather the data to store for the trial
      var trial_data = {
        "rt": response.rt,
        "stimulus": trial.targetStim,
        "key_press": response.key
      };

      // clear the display
      display_element.innerHTML = '';

      // move on to the next trial
      jsPsych.finishTrial(trial_data);
    };

    // helper functions

    function random_coordinate(max_width, max_height) {
      var rnd_x = Math.floor(Math.random() * (max_width - 1));
      var rnd_y = Math.floor(Math.random() * (max_height - 1));

      return {
        x: rnd_x,
        y: rnd_y
      };
    }

    // //////////////////////////////////////////////////////////////////////////////////////////////////////////


    // start the response listener
    if (trial.choices != jsPsych.NO_KEYS) {
      var keyboardListener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: trial.choices,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    }


    // end trial if trial_duration is set
    if (trial.trial_duration !== null) {
      jsPsych.pluginAPI.setTimeout(function() {
        end_trial();
      }, trial.trial_duration);
    }

  };

  return plugin;
})();
