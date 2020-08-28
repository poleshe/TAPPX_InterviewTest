<?php

namespace App\Http\Controllers;
use App\Bundle;
use Illuminate\Http\Request;
use DB;
use Carbon\Carbon;

// Cors allowing as this is only a dev server
header("Access-Control-Allow-Origin: *");

class BundleController extends Controller
{
    public function store(Request $request)
    {
        // Get the form data and decode.
        $data = json_decode($request->getContent(), true);
        // Send the name and bundle to the validation function
        $validation_check = $this->validateData($data['name'], $data['bundle']);
        // If it's ok, save into the database and return 200. If not, return 503.
        if($validation_check == True){
            $this->insertNewBundle($data['name'], $data['bundle']);
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

    // General function to insert data inside the Bundle table, from the Bundle Controller. 
    // Made as a function for scaling and code cleanliness.
    // Parameters: STRING name, STRING bundle
    // 
    // Returns: Raises an exception if there's an error. Otherwise returns null.
    public function insertNewBundle(String $name, String $bundlename)
    {
        $bundle = new Bundle;
        $bundle->name=$name;
        $bundle->bundle=$bundlename;
        $bundle->created_at=Carbon::now();
        $bundle->updated_at=Carbon::now();
        if(!$bundle->save()){
            App::abort(500, 'Error while saving into DB.');
        }
    }

    // Get all data from the Bundle Table and send as an array.
    // Parameters: None.
    //
    // Returns: Json with all Bundle Table Data.

    public function getBundleData()
    {
        $bundle = Bundle::all();
        $bundle = $bundle->toJson();
        return $bundle;
    }


}
