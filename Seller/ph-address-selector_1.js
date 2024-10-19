/**
 * __________________________________________________________________
 *
 * Phillipine Address Selector
 * __________________________________________________________________
 *
 * MIT License
 * 
 * Copyright (c) 2020 Wilfred V. Pine
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * @package Phillipine Address Selector
 * @author Wilfred V. Pine <only.master.red@gmail.com>
 * @copyright Copyright 2020 (https://dev.confired.com)
 * @link https://github.com/redmalmon/philippine-address-selector
 * @license https://opensource.org/licenses/MIT MIT License
 */

var my_handlers = {
    // fill province
    fill_provinces: function() {
        //selected region
        var region_code1 = $(this).val();

        // set selected text to input
        var region_text1 = $(this).find("option:selected").text();
        let region_input1 = $('#region-text1');
        region_input1.val(region_text1);
        //clear province & city & barangay input
        $('#province-text1').val('');
        $('#city-text1').val('');
        $('#barangay-text1').val('');

        //province
        let dropdown = $('#province1');
        dropdown.empty();
        dropdown.append('<option selected="true" disabled>Choose State/Province</option>');
        dropdown.prop('selectedIndex', 0);

        

        //city
        let city1 = $('#city1');
        city1.empty();
        city1.append('<option selected="true" disabled></option>');
        city1.prop('selectedIndex', 0);


        //barangay
        let barangay1 = $('#barangay1');
        barangay1.empty();
        barangay1.append('<option selected="true" disabled></option>');
        barangay1.prop('selectedIndex', 0);

        


        // filter & fill
        var url = 'ph-json-1/province.json';
        $.getJSON(url, function(data) {
            var result = data.filter(function(value) {
                return value.region_code1 == region_code1;
            });

            result.sort(function(a, b) {
                return a.province_name1.localeCompare(b.province_name1);
            });

            $.each(result, function(key, entry) {
                dropdown.append($('<option></option>').attr('value', entry.province_code1).text(entry.province_name1));
            })

        });
    },
    // fill city
    fill_cities: function() {
        //selected province
        var province_code1 = $(this).val();

        // set selected text to input
        var province_text1 = $(this).find("option:selected").text();
        let province_input1 = $('#province-text1');
        province_input1.val(province_text1);
        //clear city & barangay input
        $('#city-text1').val('');
        $('#barangay-text1').val('');

        //city
        let dropdown = $('#city1');
        dropdown.empty();
        dropdown.append('<option selected="true" disabled>Choose city/municipality</option>');
        dropdown.prop('selectedIndex', 0);

       

        //barangay
        let barangay = $('#barangay1');
        barangay.empty();
        barangay.append('<option selected="true" disabled></option>');
        barangay.prop('selectedIndex', 0);

       

        // filter & fill
        var url = 'ph-json-1/city.json';
        $.getJSON(url, function(data) {
            var result = data.filter(function(value) {
                return value.province_code1 == province_code1;
            });

            result.sort(function(a, b) {
                return a.city_name.localeCompare(b.city_name);
            });

            $.each(result, function(key, entry) {
                dropdown.append($('<option></option>').attr('value', entry.city_code).text(entry.city_name));
            })

        });
    },
    // fill barangay
    fill_barangays: function() {
        // selected barangay
        var city_code1 = $(this).val();

        // set selected text to input
        var city_text1 = $(this).find("option:selected").text();
        let city_input1 = $('#city-text1');
        city_input1.val(city_text1);
        //clear barangay input
        $('#barangay-text1').val('');

        // barangay
        let dropdown = $('#barangay1');
        dropdown.empty();
        dropdown.append('<option selected="true" disabled>Choose barangay</option>');
        dropdown.prop('selectedIndex', 0);


        // filter & Fill
        var url = 'ph-json-1/barangay.json';
        $.getJSON(url, function(data) {
            var result = data.filter(function(value) {
                return value.city_code1 == city_code1;
            });

            result.sort(function(a, b) {
                return a.brgy_name.localeCompare(b.brgy_name);
            });

            $.each(result, function(key, entry) {
                dropdown.append($('<option></option>').attr('value', entry.brgy_code).text(entry.brgy_name));
            })

        });
    },

    onchange_barangay: function() {
        // set selected text to input
        var barangay_text1 = $(this).find("option:selected").text();
        let barangay_input1 = $('#barangay-text1');
        barangay_input1.val(barangay_text1);
    },

};


$(function() {
    // events
    $('#region1').on('change', my_handlers.fill_provinces);
    $('#province1').on('change', my_handlers.fill_cities);
    $('#city1').on('change', my_handlers.fill_barangays);
    $('#barangay1').on('change', my_handlers.onchange_barangay);

    // load region
    let dropdown = $('#region1');
    dropdown.empty();
    dropdown.append('<option selected="true" disabled>Choose Region</option>');
    dropdown.prop('selectedIndex', 0);

    const url = 'ph-json-1/region.json';
    // Populate dropdown with list of regions
    $.getJSON(url, function(data) {
        $.each(data, function(key, entry) {
            dropdown.append($('<option></option>').attr('value', entry.region_code).text(entry.region_name));
        })
    });

});