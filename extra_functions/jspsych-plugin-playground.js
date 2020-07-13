/*
 * Example plugin template
 */

jsPsych.plugins["plugin-playground"] = (function() {

  var plugin = {};

  plugin.info = {
    name: "plugin-playground",
    description: "",
    parameters: {
      targetStim: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The image to be displayed'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
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

    // Display the target stimulu\
    html = '<img src="'+trial.targetStim+'" id="jspsych-plugin-playground-target-stimulus" style="';
    
    if(trial.stimulus_height !== null){
      html += 'height:'+trial.stimulus_height+'px; '
      if(trial.stimulus_width == null && trial.maintain_aspect_ratio){
        html += 'width: auto; ';
      }
    }
    if(trial.stimulus_width !== null){
      html += 'width:'+trial.stimulus_width+'px; '
      if(trial.stimulus_height == null && trial.maintain_aspect_ratio){
        html += 'height: auto; ';
      }
    }

      // Add positioning for the image
      html += 'position: absolute; left: ' + bellPosition.left + 'px; top: ' + bellPosition.top + 'px ';

    html +='"></img>';

    // Show prompt at the top
    if (trial.prompt !== null) {
      html += trial.prompt;
    }
    

    
    display_element.innerHTML = html;

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
