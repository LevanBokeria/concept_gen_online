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
      prompt_img_path: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Target',
        default: undefined,
        array: true,
        description: 'Target stimulus to display.'
      },      
      maintain_aspect_ratio: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Maintain aspect ratio',
        default: true,
        description: 'Maintain the aspect ratio after setting width or height'
      },      
      prompt_img_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus height',
        default: 100,
        description: 'Height of images in pixels.'
      },
      prompt_img_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus width',
        default: 100,
        description: 'Width of images in pixels'
      },
      prompt_img_x_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus x coordinates',
        default: 100,
        description: 'X coordinate of images.'
      },
      prompt_img_y_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus y coordinates',
        default: 100,
        description: 'Y coordinates of images'
      },
      ex_pairs_img: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Target',
        default: undefined,
        array: true,
        description: 'Target stimulus to display.'
      },      
      ex_pairs_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'ex pairs height',
        default: 100,
        description: 'Height of images in pixels.'
      },
      ex_pairs_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'ex pairs width',
        default: 100,
        description: 'Width of images in pixels'
      },         
      // fb_target_x_coords: {
      //   type: jsPsych.plugins.parameterType.INT,
      //   pretty_name: 'Stimulus x coordinates',
      //   default: 100,
      //   description: 'X coordinate of images.'
      // },
      // fb_target_y_coords: {
      //   type: jsPsych.plugins.parameterType.INT,
      //   pretty_name: 'Stimulus y coordinates',
      //   default: 100,
      //   description: 'Y coordinates of images'
      // },
      // fb_foil_x_coords: {
      //   type: jsPsych.plugins.parameterType.INT,
      //   pretty_name: 'Stimulus x coordinates',
      //   default: 100,
      //   description: 'X coordinate of images.'
      // },
      // fb_foil_y_coords: {
      //   type: jsPsych.plugins.parameterType.INT,
      //   pretty_name: 'Stimulus y coordinates',
      //   default: 100,
      //   description: 'Y coordinates of images'
      // },          
      // fb_green_tick_img: {
      //   type: jsPsych.plugins.parameterType.STRING,
      //   pretty_name: 'Target',
      //   default: undefined,
      //   array: true,
      //   description: 'Target stimulus to display.'
      // },      
      // fb_green_tick_height: {
      //   type: jsPsych.plugins.parameterType.INT,
      //   pretty_name: 'ex pairs height',
      //   default: 100,
      //   description: 'Height of images in pixels.'
      // },
      // fb_green_tick_width: {
      //   type: jsPsych.plugins.parameterType.INT,
      //   pretty_name: 'ex pairs width',
      //   default: 100,
      //   description: 'Width of images in pixels'
      // },         
      // fb_green_tick_x_coords: {
      //   type: jsPsych.plugins.parameterType.INT,
      //   pretty_name: 'Stimulus x coordinates',
      //   default: 100,
      //   description: 'X coordinate of images.'
      // },
      // fb_green_tick_y_coords: {
      //   type: jsPsych.plugins.parameterType.INT,
      //   pretty_name: 'Stimulus y coordinates',
      //   default: 100,
      //   description: 'Y coordinates of images'
      // },
      // fb_red_x_img: {
      //   type: jsPsych.plugins.parameterType.STRING,
      //   pretty_name: 'Target',
      //   default: undefined,
      //   array: true,
      //   description: 'Target stimulus to display.'
      // },      
      // fb_red_x_height: {
      //   type: jsPsych.plugins.parameterType.INT,
      //   pretty_name: 'ex pairs height',
      //   default: 100,
      //   description: 'Height of images in pixels.'
      // },
      // fb_red_x_width: {
      //   type: jsPsych.plugins.parameterType.INT,
      //   pretty_name: 'ex pairs width',
      //   default: 100,
      //   description: 'Width of images in pixels'
      // },         
      // fb_red_x_x_coords: {
      //   type: jsPsych.plugins.parameterType.INT,
      //   pretty_name: 'Stimulus x coordinates',
      //   default: 100,
      //   description: 'X coordinate of images.'
      // },
      // fb_red_x_y_coords: {
      //   type: jsPsych.plugins.parameterType.INT,
      //   pretty_name: 'Stimulus y coordinates',
      //   default: 100,
      //   description: 'Y coordinates of images'
      // },                  
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
      response_ends_trial: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Response ends trial',
        default: true,
        description: 'If true, trial will end when user makes a response.'
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

    // ADD PROMPT TEXT
    const prompt = document.createElement('P')
    prompt.innerText = trial.prompt
    display_element.querySelector("#jspsych-free-sort-arena").appendChild(prompt)

    prompt.id = 'prompt'

    // ADD PROMPT IMAGE
    const prompt_img = document.createElement('img')
    prompt_img.src = trial.prompt_img_path
    prompt_img.dataset.src = trial.prompt_img_path

    prompt_img.id = 'prompt_img'

    display_element.querySelector("#jspsych-free-sort-arena").appendChild(prompt_img)

    prompt_img.width = trial.prompt_img_width
    prompt_img.height = trial.prompt_img_height

    prompt_img.style = 'position: absolute; top:' + trial.prompt_img_y_coords + 'px; left:' 
      + trial.prompt_img_x_coords + 'px;'

    // ADD ex img
    const ex_pairs_img = document.createElement('img')
    ex_pairs_img.src = trial.ex_pairs_img
    ex_pairs_img.dataset.src = trial.ex_pairs_img

    ex_pairs_img.id = 'ex_pairs_img'


    display_element.querySelector("#jspsych-free-sort-arena").appendChild(ex_pairs_img)

    ex_pairs_img.width = trial.ex_pairs_width

    ex_pairs_img.style = 'position: absolute; top:' + (trial.prompt_img_y_coords + trial.prompt_img_height + 30) + 
                              'px; left:' + (trial.sort_area_width/2 - trial.ex_pairs_width/2) + 'px;'

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
      // display_element.innerHTML = '';
      document.querySelector("#prompt_img").style.visibility = 'hidden';
      document.querySelector("#ex_pairs_img").style.visibility = 'hidden';      

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
