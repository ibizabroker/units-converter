import './Home.scss';

import React, {useState, useEffect} from 'react'
import { RiArrowLeftRightLine } from 'react-icons/ri';

function Home() {

    const [active, setActive] = useState(1);
    const [inputValue, setInputValue] = useState(100.0);
    const [outputValue, setOutputValue] = useState();
    const [inputUnit, setInputUnit] = useState('m');
    const [outputUnit, setOutputUnit] = useState('miles');

    useEffect(() => {
        if(active===1){
            setInputUnit('cm');
            setOutputUnit('m');
        }
        if(active===2){
            setInputUnit('g');
            setOutputUnit('kg')
        }
        if(active===3){
            setInputUnit('ml');
            setOutputUnit('liter')
        }
        if(active===4){
            setInputUnit('c');
            setOutputUnit('f');
        }
        if(active===5){
            setInputUnit('inr');
            setOutputUnit('usd');
        }
    }, [active]);

    const heading = ['Distance', 'Weight/Mass', 'Volume', 'Temperature', 'Currency'];

    useEffect(() => {
        setOutputValue(inputValue);
    }, [inputValue])

    // useEffect(() => {console.log(inputUnit)}, [inputUnit]);

    function calculate () {
        if(active === 1){
            const units = ['cm', 'm', 'km', 'in', 'foot', 'yard', 'miles'];
            const multiply1 = [1, 100, 100000, 2.54, 30.48, 91.44, 160934];
            const multiply2 = [1, 0.01, 0.00001, 0.393701, 0.0328084, 0.0109361, 0.0000062137];
            common(multiply1, multiply2, units);            
        } else if(active === 2){
            const units = ['g', 'kg', 'oz', 'lb'];
            const multiply1 = [1, 1000, 28.3495, 453.592909];
            const multiply2 = [1, 0.001, 0.035274, 0.00220462];
            common(multiply1, multiply2, units);
        } else if(active === 3){
            const units = ['ml', 'liter', 'igal', 'iqua', 'ipin', 'mgal', 'mquar', 'mpin'];
            const multiply1 = [1, 1000, 4546.09, 1136.52, 568.261, 3785.41, 946.353, 473.176];
            const multiply2 = [1, 0.001, 0.000219969, 0.000879877, 0.00175975, 0.000264172, 0.00105669, 0.00211338];
            common(multiply1, multiply2, units);
        } else if (active === 4){
            const units = ['c', 'f', 'k'];
            var index1 = units.indexOf(inputUnit);
            var index2 = units.indexOf(outputUnit);
            if(index1 === index2){
                setOutputValue(inputValue);
                return;
            }
            if(inputUnit === 'c' && outputUnit === 'f'){
                var temp = inputValue * 9 / 5;
                temp = temp + 32;
                setOutputValue(parseFloat(temp).toFixed(4));
                return;
            }
            if(inputUnit === 'f' && outputUnit === 'c'){
                var temp = inputValue - 32;
                temp = temp * 5/9;
                setOutputValue(parseFloat(temp).toFixed(4));
                return;
            }
            if(inputUnit === 'c' && outputUnit === 'k') {
                setOutputValue(parseFloat(inputValue + 273.15).toFixed(4));
                return;
            }
            if(inputUnit === 'k' && outputUnit === 'c') {
                setOutputValue(parseFloat(inputValue - 273.15).toFixed(4));
                return;
            }
            if(inputUnit === 'f' && outputUnit === 'k') {
                var temp = inputValue - 32;
                temp = (temp * 5/9) + 273.15;
                setOutputValue(parseFloat(temp).toFixed(4));
                return;
            }
            if(inputUnit === 'k' && outputUnit === 'f') {
                var temp = inputValue - 273.15;
                temp = (temp * 9/5) + 32;
                setOutputValue(parseFloat(temp).toFixed(4));
                return;
            }
        } else if(active === 5){
            const units = ['inr', 'usd', 'euro', 'pound'];
            const multiply1 = [1, 74.43, 84.83, 101.49];
            const multiply2 = [1, 0.013, 0.012, 0.0099];
            common(multiply1, multiply2, units);
        } 
    }

    function common(arr1, arr2, units) {
        var index1 = units.indexOf(inputUnit);
        var index2 = units.indexOf(outputUnit);
        if(index1 === index2) {
            setOutputValue(inputValue);
            return;
        }
        var temp = inputValue;
        temp = temp * arr1[index1];
        temp = temp * arr2[index2];
        temp = parseFloat(temp)
        setOutputValue(temp);
    }

    useEffect(() => {calculate();}, [inputValue, inputUnit, outputUnit]);

    function swap() {
        var t = inputUnit;
        setInputUnit(outputUnit);
        setOutputUnit(t);
        return;
    }

    return (
        <div className="home-div">
            <h1>{heading[active-1]} Converter</h1>
            <div className="card">
                <div className="tabs">
                    <div className={`tab ${active===1 ? `active` : ''}`} onClick={()=>setActive(1)}>
                        <p>{heading[0]}</p>
                    </div>
                    <div className={`tab ${active===2 ? `active` : ''}`} onClick={()=>setActive(2)}>
                        <p>{heading[1]}</p>
                    </div>
                    <div className={`tab ${active===3 ? `active` : ''}`} onClick={()=>setActive(3)}>
                        <p>{heading[2]}</p>
                    </div>
                    <div className={`tab ${active===4 ? `active` : ''}`} onClick={()=>setActive(4)}>
                        <p>{heading[3]}</p>
                    </div>
                    <div className={`tab ${active===5 ? `active` : ''}`} onClick={()=>setActive(5)}>
                        <p>{heading[4]}</p>
                    </div>
                </div>
                <div className="content">
                    <div className="section1">
                        <p>Input</p>
                        <input type="number" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} ></input>
                    </div>
                    <div className="section2">
                        <select value={inputUnit} onChange={e=>setInputUnit(e.target.value)}>
                            {
                                active === 1
                                ? <> 
                                    <option value="cm">Centimeter</option>
                                    <option value="m">Meter</option>
                                    <option value="km">Kilometer</option>
                                    <option value="in">Inch</option>
                                    <option value="foot">Foot</option>
                                    <option value="yard">Yard</option>
                                    <option value="miles">Mile</option>
                                </>
                                : active === 2
                                ? <>
                                    <option value="g">Gram</option>
                                    <option value="kg">Kilogram</option>
                                    <option value="oz">Ounce</option>
                                    <option value="lb">Pound</option>
                                </>
                                : active === 3
                                ? <>
                                    <option value="ml">Mililiter</option>
                                    <option value="liter">Liter</option>
                                    <option value="igal">Imperial Gallon</option>
                                    <option value="iqua">Imperial Quart</option>
                                    <option value="ipin">Imperial Pint</option>
                                    <option value="mgal">Metric Gallon</option>
                                    <option value="mquar">Metric Quart</option>
                                    <option value="mpin">Metric Pint</option>
                                </>
                                : active === 4
                                ? <> 
                                    <option value="c">Celsius</option>
                                    <option value="f">Fahrenheit</option>
                                    <option value="k">Kelvin</option>
                                </>
                                : active === 5
                                ? <> 
                                    <option value="inr">INR</option>
                                    <option value="usd">USD</option>
                                    <option value="euro">Euro</option>
                                    <option value="pound">Pound</option>
                                </>
                                : null
                            }
                        </select>
                    </div>
                    <div className="section3" onClick={()=>swap()}>
                        <RiArrowLeftRightLine size="20" color="white" />
                    </div>
                    <div className="section4">
                    <select value={outputUnit} onChange={(e)=>setOutputUnit(e.target.value)}>
                        {
                            active === 1
                            ? <> 
                                <option value="cm">Centimeter</option>
                                <option value="m">Meter</option>
                                <option value="km">Kilometer</option>
                                <option value="in">Inch</option>
                                <option value="foot">Foot</option>
                                <option value="yard">Yard</option>
                                <option value="miles">Mile</option>
                            </>
                            : active === 2
                            ? <>
                                <option value="g">Gram</option>
                                <option value="kg">Kilogram</option>
                                <option value="oz">Ounce</option>
                                <option value="lb">Pound</option>
                            </>
                            : active === 3
                            ? <>
                                <option value="ml">Mililiter</option>
                                <option value="liter">Liter</option>
                                <option value="igal">Imperial Gallon</option>
                                <option value="iqua">Imperial Quart</option>
                                <option value="ipin">Imperial Pint</option>
                                <option value="mgal">Metric Gallon</option>
                                <option value="mquar">Metric Quart</option>
                                <option value="mpin">Metric Pint</option>
                            </>
                            : active === 4
                            ? <> 
                                <option value="c">Celsius</option>
                                <option value="f">Fahrenheit</option>
                                <option value="k">Kelvin</option>
                            </>
                            : active === 5
                            ? <> 
                                <option value="inr">INR</option>
                                <option value="usd">USD</option>
                                <option value="euro">Euro</option>
                                <option value="pound">Pound</option>
                            </>
                            : null
                        }
                    </select>
                    </div>
                    <div className="section5">
                        <p>Output</p>
                        <input type="number" value={outputValue}></input>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
