<?php

namespace App\Http\Controllers;
use App\Bundle;
use Illuminate\Http\Request;

class BundleController extends Controller
{
    public function store(Request $request)
    {
        // Get the form data and decode.
        $data = json_decode($request->getContent(), true);
        // Send the name and bundle to the validation function
        $validation_check = $this->validateData($data['name'], $data['bundle']);

        if($validation_check == True){
            return 200;
        } else {
            echo "Error while Validating input data";
            return 503;
        }
    }

    // This function compares name and bundle and returns either True if everything is OK or false if not.
    // It is put in another function to help with scaling and code cleanliness.
    // Parameters: STRING name, STRING bundle
    // 
    // Returns: Boolean.
    public function validateData(String $name, String $bundle)
    {
        // First we check the name.
        $pattern = '/^[a-zA-Z0-9 \-_]*([a-zA-Z0-9]{2})[a-zA-Z0-9 \-_]*$/'; // Name regex. Only contain letters, numbers, spaces or - or _ and at least 2 numbers or letters.
        if(preg_match($pattern, $name) != 1){ // If preg_match finds a match, it returns1, if not, 0.
            echo("False");
            return False;
        }
        // Now the bundle.
        $pattern = '/^(([a-zA-Z0-9_])*(\.))+[a-zA-Z]+\w*$/'; // Bundle regex. It must have at least two segments, each segments starts with a letter and all characters alphanumeric or underscore.
        if(preg_match($pattern, $bundle) != 1){ // If preg_match finds a match, it returns1, if not, 0.
            echo("False");
            return False;
        }

        return True;

    }


}
