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
      target_img: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Target',
        default: undefined,
        array: true,
        description: 'Target stimulus to display.'
      },      
      target_img_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus height',
        default: 100,
        description: 'Height of images in pixels.'
      },
      target_img_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus width',
        default: 100,
        description: 'Width of images in pixels'
      },
      target_img_x_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus x coordinates',
        default: 100,
        description: 'X coordinate of images.'
      },
      target_img_y_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus y coordinates',
        default: 100,
        description: 'Y coordinates of images'
      },
      foil_img: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Foil',
        default: undefined,
        array: true,
        description: 'Foil toy to display.'
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
      fb_target_x_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus x coordinates',
        default: 100,
        description: 'X coordinate of images.'
      },
      fb_target_y_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus y coordinates',
        default: 100,
        description: 'Y coordinates of images'
      },
      fb_foil_x_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus x coordinates',
        default: 100,
        description: 'X coordinate of images.'
      },
      fb_foil_y_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus y coordinates',
        default: 100,
        description: 'Y coordinates of images'
      },          
      fb_green_tick_img: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Target',
        default: undefined,
        array: true,
        description: 'Target stimulus to display.'
      },      
      fb_green_tick_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'ex pairs height',
        default: 100,
        description: 'Height of images in pixels.'
      },
      fb_green_tick_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'ex pairs width',
        default: 100,
        description: 'Width of images in pixels'
      },         
      fb_green_tick_x_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus x coordinates',
        default: 100,
        description: 'X coordinate of images.'
      },
      fb_green_tick_y_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus y coordinates',
        default: 100,
        description: 'Y coordinates of images'
      },
      fb_red_x_img: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Target',
        default: undefined,
        array: true,
        description: 'Target stimulus to display.'
      },      
      fb_red_x_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'ex pairs height',
        default: 100,
        description: 'Height of images in pixels.'
      },
      fb_red_x_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'ex pairs width',
        default: 100,
        description: 'Width of images in pixels'
      },         
      fb_red_x_x_coords: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus x coordinates',
        default: 100,
        description: 'X coordinate of images.'
      },
      fb_red_x_y_coords: {
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
    target_image.src = trial.target_img
    target_image.dataset.src = trial.target_img

    display_element.querySelector("#jspsych-free-sort-arena").appendChild(target_image)

    target_image.width = trial.target_img_width
    target_image.height = trial.target_img_height

    target_image.style = 'position: absolute; top:' + trial.target_img_y_coords + 'px; left:' + trial.target_img_x_coords + 'px;'

    // ADD ex IMAGE
    const ex_pairs_img = document.createElement('img')
    ex_pairs_img.src = trial.ex_pairs_img
    ex_pairs_img.dataset.src = trial.ex_pairs_img

    display_element.querySelector("#jspsych-free-sort-arena").appendChild(ex_pairs_img)

    ex_pairs_img.width = trial.ex_pairs_width
    ex_pairs_img.height = trial.ex_pairs_height

    ex_pairs_img.style = 'position: absolute; top:' + (trial.target_img_y_coords + trial.target_img_height) + 
                              'px; left:' + (trial.sort_area_width/2 - trial.ex_pairs_width/2) + 'px;'

    // ADD fb TARGET IMAGE
    const fb_target_img = document.createElement('img')
    fb_target_img.src = trial.target_img
    fb_target_img.dataset.src = trial.target_img

    display_element.querySelector("#jspsych-free-sort-arena").appendChild(fb_target_img)

    fb_target_img.width = trial.target_img_width
    fb_target_img.height = trial.target_img_height

    fb_target_img.style = 'position: absolute; top:' + trial.fb_target_y_coords + 
                              'px; left:' + trial.fb_target_x_coords + 'px;'


    // ADD fb FOIL IMAGE
    const fb_foil_img = document.createElement('img')
    fb_foil_img.src = trial.foil_img
    fb_foil_img.dataset.src = trial.foil_img

    display_element.querySelector("#jspsych-free-sort-arena").appendChild(fb_foil_img)

    fb_foil_img.width = trial.target_img_width
    fb_foil_img.height = trial.target_img_height

    fb_foil_img.style = 'position: absolute; top:' + trial.fb_foil_y_coords + 
                              'px; left:' + trial.fb_foil_x_coords + 'px;'

    // ADD fb GREEN TICK IMAGE
    const fb_green_tick_img = document.createElement('img')
    fb_green_tick_img.src = trial.fb_green_tick_img
    fb_green_tick_img.dataset.src = trial.fb_green_tick_img

    display_element.querySelector("#jspsych-free-sort-arena").appendChild(fb_green_tick_img)

    fb_green_tick_img.width = trial.fb_green_tick_width
    fb_green_tick_img.height = trial.fb_green_tick_height

    fb_green_tick_img.style = 'position: absolute; top:' + trial.fb_green_tick_y_coords + 
                              'px; left:' + trial.fb_green_tick_x_coords + 'px;'

    // ADD fb RED X IMAGE
    const fb_red_x_img = document.createElement('img')
    fb_red_x_img.src = trial.fb_red_x_img
    fb_red_x_img.dataset.src = trial.fb_red_x_img

    display_element.querySelector("#jspsych-free-sort-arena").appendChild(fb_red_x_img)

    fb_red_x_img.width = trial.fb_red_x_width
    fb_red_x_img.height = trial.fb_red_x_height

    fb_red_x_img.style = 'position: absolute; top:' + trial.fb_red_x_y_coords + 
                              'px; left:' + trial.fb_red_x_x_coords + 'px;'


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
