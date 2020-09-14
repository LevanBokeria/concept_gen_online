/* jspsych-instructions.js
 * Josh de Leeuw
 *
 * This plugin displays text (including HTML formatted strings) during the experiment.
 * Use it to show instructions, provide performance feedback, etc...
 *
 * Page numbers can be displayed to help with navigation by setting show_page_number
 * to true.
 *
 * documentation: docs.jspsych.org
 *
 *
 */

jsPsych.plugins['instructions-timer-enhanced'] = (function() {

  var plugin = {};
  
  plugin.info = {
    name: 'instructions-timer-enhanced',
    description: 'Modified enhanced instructions page, with flags for counting time, displaying time, conditionalizing the next button on time.',
    parameters: {
      pages: {
        type: jsPsych.plugins.parameterType.HTML_STRING,
        pretty_name: 'Pages',
        default: undefined,
        array: true,
        description: 'Each element of the array is the content for a single page.'
      },
      key_forward: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Key forward',
        default: 'rightarrow',
        description: 'The key the subject can press in order to advance to the next page.'
      },
      key_backward: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Key backward',
        default: 'leftarrow',
        description: 'The key that the subject can press to return to the previous page.'
      },
      allow_backward: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Allow backward',
        default: true,
        description: 'If true, the subject can return to the previous page of the instructions.'
      },
      allow_keys: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Allow keys',
        default: true,
        description: 'If true, the subject can use keyboard keys to navigate the pages.'
      },
      show_clickable_nav: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Show clickable nav',
        default: false,
        description: 'If true, then a "Previous" and "Next" button will be displayed beneath the instructions.'
      },
      show_page_number: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: 'Show page number',
          default: false,
          description: 'If true, and clickable navigation is enabled, then Page x/y will be shown between the nav buttons.'
      },
      button_label_previous: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label previous',
        default: 'Previous',
        description: 'The text that appears on the button to go backwards.'
      },
      button_label_next: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Button label next',
        default: 'Next',
        description: 'The text that appears on the button to go forwards.'
      },
      timer_on: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Timer on or off',
        default: false,
        description: 'If true, then a timer will be counting down for n_seconds.'
      },
      pages_with_timer_on: {
        type: jsPsych.plugins.parameterType.OBJECT,
        pretty_name: 'Which pages have the timer',
        default: {},
        description: 'Which of the pages will have the timer if the timer is set to on?'
      },            
      timed_key_forward: {
        type: jsPsych.plugins.parameterType.BOOL,
        pretty_name: 'Timer determines the next key',
        default: false,
        description: 'If true, then the "Next" button will only become available once countdown ends.'
      },      
      n_seconds: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Seconds for timer',
        default: null,
        description: 'Number of seconds to count down.'
      },                  
      show_timer: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: 'Show countdown timer',
          default: false,
          description: 'If true, then countrown timer will show the remaining time at the top of the page.'
      }

    }
  }

  plugin.trial = function(display_element, trial) {

    var current_page = 0;

    var view_history = [];

    var start_time = performance.now();

    var last_page_update_time = start_time;

    // My added variables
    var seconds_remaining = trial.n_seconds;
    var allow_next_button = 0;
    var interval;
    var viewed_pages = [];
    // //////////////////

    function btnListener(evt){
    	evt.target.removeEventListener('click', btnListener);
    	if(this.id === "jspsych-instructions-back"){
    		back();
    	}
    	else if(this.id === 'jspsych-instructions-next'){
    		next();
    	}
    }

    function show_current_page() {

      // console.log(view_history)

      var html = trial.pages[current_page];

      var pagenum_display = "";
      if(trial.show_page_number) {
          pagenum_display = "<span style='margin: 0 1em;' class='"+
          "jspsych-instructions-pagenum'>Page "+(current_page+1)+"/"+trial.pages.length+"</span>";
      }
     
      if (trial.show_clickable_nav) {

        var nav_html = "<div class='jspsych-instructions-nav' style='padding: 10px 0px;'>";
        if (trial.allow_backward) {
          var allowed = (current_page > 0 )? '' : "disabled='disabled'";
          nav_html += "<button id='jspsych-instructions-back' class='jspsych-btn' style='margin-right: 5px;' "+allowed+">&lt; "+trial.button_label_previous+"</button>";
        }
        if (trial.pages.length > 1 && trial.show_page_number) {
            nav_html += pagenum_display;
        }
        nav_html += "<button id='jspsych-instructions-next' class='jspsych-btn'"+
            "style='margin-left: 5px;'>"+trial.button_label_next+
            " &gt;</button></div>";

        html += nav_html;

        // Add the timer here

        // Redefine the seconds_remaining so that after each page, the timer restarts
        seconds_remaining = trial.n_seconds;

        if (trial.timer_on && 
            trial.pages_with_timer_on.pages.indexOf(current_page) != -1) {
            
              if (view_history.length != 0) {
                
                // So, if its not the very first page, check if you've already visited this page

                if (viewed_pages.indexOf(current_page) == -1) {
                  
                  // So, if you have not visited this page, then start the timer

                  
                  // Start the interval function
                  interval = setInterval(countdown_timer,1000);

                  // If the timer should be displayed:
                  if (trial.show_timer) {

                      html += "<div id='countdown-timer'>";
                      html += "<p>" + trial.n_seconds + " seconds remaining </p>";
                      html += "</div>";
                  }

                } else {
                  // So, you've visited this page before. If timer is on, then just let the next button work.
                  allow_next_button = 1;
                }
              } else {
                
                // So, this is the very first page

                // Start the interval function
                interval = setInterval(countdown_timer,1000);

                // If the timer should be displayed:
                if (trial.show_timer) {

                    html += "<div id='countdown-timer'>";
                    html += "<p>" + trial.n_seconds + " seconds remaining </p>";
                    html += "</div>";
                }
              }

        }
        // //////////////////////////////////////////////

        display_element.innerHTML = html;
        if (current_page != 0 && trial.allow_backward) {
          display_element.querySelector('#jspsych-instructions-back').addEventListener('click', btnListener);
        }

        // My addition: if timer doesn't determine the "Next" button, then just show the "next" button. 
        // Also, if you've been on this page before, then show it. Else, do not show it yet.
        if (!trial.timer_on || !trial.timed_key_forward ||  
            trial.pages_with_timer_on.pages.indexOf(current_page) == -1 || allow_next_button) {
            display_element.querySelector('#jspsych-instructions-next').addEventListener('click', btnListener);
        }
        // ////////////////////////////////////////////////////////////////////////////////////////
        
      } else {
        if (trial.show_page_number && trial.pages.length > 1) {
          // page numbers for non-mouse navigation
          html += "<div class='jspsych-instructions-pagenum'>"+pagenum_display+"</div>"
        } 
        display_element.innerHTML = html;
      }
      
    }

    // My added function

    // Function to count down timer
    function countdown_timer() {

        seconds_remaining--;
        // console.log("seconds remaining: " + seconds_remaining)

        // console.log(seconds_remaining);

        // If timer should be shown, update its value.
        if (trial.show_timer) {
            display_element.querySelector("#countdown-timer").innerHTML = "<p>" + seconds_remaining + " seconds remaining </p>";
        }
        
        
        if (seconds_remaining == 0){
            
            // Stop interval
            clearInterval(interval);


            // If the timer determines the "Next" button availability:

            if (trial.timed_key_forward) {
                
                // Allow next button
                allow_next_button = 1;

                if (trial.show_clickable_nav){
                    display_element.querySelector('#jspsych-instructions-next').addEventListener('click', btnListener);
                }
            }

            // console.log("DONE!");
            
        }
    }
    // /////////////////////////////////////////////


    function next() {

        // If the "Next" button doesn't depend on the timer OR
        // If it does depend on it and timer has run out, then:
        if (!trial.timer_on || !trial.timed_key_forward || allow_next_button || trial.pages_with_timer_on.pages.indexOf(current_page) == -1) {

            add_current_page_to_view_history()

            current_page++;
      
            // if done, finish up...
            if (current_page >= trial.pages.length) {
              endTrial();
            } else {
              show_current_page();
            }
        }
    }

    function back() {

      add_current_page_to_view_history()

      current_page--;

      show_current_page();
    }

    function add_current_page_to_view_history() {

      var current_time = performance.now();

      var page_view_time = current_time - last_page_update_time;

      view_history.push({
        page_index: current_page,
        viewing_time: page_view_time
      });

      // My addition: record which pages were viewed in an array 
      viewed_pages.push(current_page)
      // ///////////////////////////////////////////////////////

      last_page_update_time = current_time;
    }

    function endTrial() {

      if (trial.allow_keys) {
        jsPsych.pluginAPI.cancelKeyboardResponse(keyboard_listener);
      }

      display_element.innerHTML = '';

      var trial_data = {
        "view_history": JSON.stringify(view_history),
        "rt": performance.now() - start_time
      };

      jsPsych.finishTrial(trial_data);
    }

    var after_response = function(info) {

      // have to reinitialize this instead of letting it persist to prevent accidental skips of pages by holding down keys too long
      keyboard_listener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: [trial.key_forward, trial.key_backward],
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
      // check if key is forwards or backwards and update page
      if (jsPsych.pluginAPI.compareKeys(info.key, trial.key_backward)) {
        if (current_page !== 0 && trial.allow_backward) {
          back();
        }
      }

      if (jsPsych.pluginAPI.compareKeys(info.key, trial.key_forward)) {
        next();
      }

    };

    show_current_page();

    if (trial.allow_keys) {
      var keyboard_listener = jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: [trial.key_forward, trial.key_backward],
        rt_method: 'performance',
        persist: false
      });
    }
  };

  return plugin;
})();
