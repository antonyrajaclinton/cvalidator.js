function $(selector) {
    var self = {};
    self.cvalidater = function () {
        var get_input_allval = document.querySelectorAll(selector);
        document.querySelectorAll('.cvalidater_error_msg').forEach(function (button) {
            button.remove()
        });
        const all_class_val = [];
        for (var val_inc = 0; val_inc < get_input_allval.length; val_inc++) {
            if (get_input_allval[val_inc].value == "") {
                // get_input_allval[i].style.borderColor = "#FF0000";
                var new_div_msg = document.createElement("p");
                new_div_msg.className = "cvalidater_error_msg";
                new_div_msg.innerHTML = get_input_allval[val_inc].placeholder;
                new_div_msg.style.color = "red";
                var div = get_input_allval[val_inc];
                div.parentNode.insertBefore(new_div_msg, div.nextSibling);
                // break;
                return false;
            } else {
                all_class_val.push(get_input_allval[val_inc].value);
            }
        }
        if (all_class_val.length == get_input_allval.length) { return true; }
    }
    return self;

}