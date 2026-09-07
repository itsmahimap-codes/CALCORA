// ========================================
// CALCORA
// Smart Calculator
// ========================================



// ========================================
// BASIC CALCULATOR
// ========================================

const expressionDisplay =
    document.getElementById("expression");

const resultDisplay =
    document.getElementById("result");

const buttons =
    document.querySelectorAll(
        ".buttons button"
    );

const explanationContent =
    document.getElementById(
        "explanationContent"
    );


let currentInput = "";

let previousInput = "";

let operator = null;

let shouldResetDisplay = false;



// ========================================
// BASIC BUTTON CLICKS
// ========================================

buttons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const value =
                button.textContent.trim();


            if (
                !isNaN(value) ||
                value === "."
            ) {

                enterNumber(value);

            }


            else if (
                ["+", "−", "×", "÷"]
                    .includes(value)
            ) {

                chooseOperator(value);

            }


            else if (
                value === "="
            ) {

                calculate();

            }


            else if (
                value === "AC"
            ) {

                clearCalculator();

            }


            else if (
                value === "⌫"
            ) {

                deleteNumber();

            }


            else if (
                value === "%"
            ) {

                percentage();

            }

        }
    );

});



// ========================================
// ENTER NUMBER
// ========================================

function enterNumber(number) {

    if (shouldResetDisplay) {

        currentInput = "";

        shouldResetDisplay = false;

    }


    if (
        number === "." &&
        currentInput.includes(".")
    ) {

        return;

    }


    if (
        number === "." &&
        currentInput === ""
    ) {

        currentInput = "0";

    }


    currentInput += number;


    resultDisplay.textContent =
        currentInput || "0";

}



// ========================================
// CHOOSE OPERATOR
// ========================================

function chooseOperator(
    selectedOperator
) {

    if (currentInput === "") {

        return;

    }


    if (operator !== null) {

        calculate();

    }


    previousInput =
        currentInput;

    operator =
        selectedOperator;


    expressionDisplay.textContent =
        `${previousInput} ${operator}`;


    shouldResetDisplay = true;

}



// ========================================
// CALCULATE
// ========================================

function calculate() {

    if (
        previousInput === "" ||
        currentInput === "" ||
        operator === null
    ) {

        return;

    }


    const firstNumber =
        parseFloat(previousInput);

    const secondNumber =
        parseFloat(currentInput);


    let answer;


    switch (operator) {

        case "+":

            answer =
                firstNumber +
                secondNumber;

            break;


        case "−":

            answer =
                firstNumber -
                secondNumber;

            break;


        case "×":

            answer =
                firstNumber *
                secondNumber;

            break;


        case "÷":

            if (
                secondNumber === 0
            ) {

                resultDisplay.textContent =
                    "Error";

                resetState();

                return;

            }


            answer =
                firstNumber /
                secondNumber;

            break;

    }


    answer =
        Number(
            answer.toFixed(10)
        );


    expressionDisplay.textContent =
        `${firstNumber} ${operator} ${secondNumber} =`;


    resultDisplay.textContent =
        answer;


    showExplanation(
        firstNumber,
        secondNumber,
        operator,
        answer
    );


    addToHistory(
        `${firstNumber} ${operator} ${secondNumber}`,
        answer
    );


    currentInput =
        answer.toString();

    previousInput = "";

    operator = null;

    shouldResetDisplay = true;

}



// ========================================
// CLEAR
// ========================================

function clearCalculator() {

    currentInput = "";

    previousInput = "";

    operator = null;

    shouldResetDisplay = false;


    expressionDisplay.textContent =
        "0";

    resultDisplay.textContent =
        "0";


    explanationContent.innerHTML = `

        <p>
            Calculate something to see how it works.
        </p>

    `;

}



// ========================================
// DELETE
// ========================================

function deleteNumber() {

    if (shouldResetDisplay) {

        return;

    }


    currentInput =
        currentInput.slice(0, -1);


    resultDisplay.textContent =
        currentInput || "0";

}



// ========================================
// PERCENTAGE
// ========================================

function percentage() {

    if (currentInput === "") {

        return;

    }


    const originalValue =
        parseFloat(currentInput);


    const percentageValue =
        originalValue / 100;


    currentInput =
        percentageValue.toString();


    resultDisplay.textContent =
        currentInput;


    expressionDisplay.textContent =
        `${originalValue}%`;


    explanationContent.innerHTML = `

        <div class="explanation-step">

            Convert
            <strong>
                ${originalValue}%
            </strong>
            into a decimal.

        </div>


        <div class="explanation-step">

            ${originalValue} ÷ 100
            =
            <strong>
                ${percentageValue}
            </strong>

        </div>


        <div class="explanation-answer">

            ${originalValue}% =
            ${percentageValue}

        </div>

    `;

}



// ========================================
// RESET STATE
// ========================================

function resetState() {

    currentInput = "";

    previousInput = "";

    operator = null;

    shouldResetDisplay = true;

}



// ========================================
// SMART EXPLAIN
// ========================================

function showExplanation(
    first,
    second,
    selectedOperator,
    answer
) {

    let explanation = "";


    switch (selectedOperator) {

        case "+":

            explanation = `

                <div class="explanation-step">

                    <strong>
                        Addition
                    </strong>

                </div>


                <div class="explanation-step">

                    Start with
                    <strong>
                        ${first}
                    </strong>

                    and add
                    <strong>
                        ${second}
                    </strong>.

                </div>


                <div class="explanation-step">

                    ${first} + ${second}
                    =
                    <strong>
                        ${answer}
                    </strong>

                </div>


                <div class="explanation-answer">

                    Answer: ${answer}

                </div>

            `;

            break;



        case "−":

            explanation = `

                <div class="explanation-step">

                    <strong>
                        Subtraction
                    </strong>

                </div>


                <div class="explanation-step">

                    Take
                    <strong>
                        ${second}
                    </strong>

                    away from
                    <strong>
                        ${first}
                    </strong>.

                </div>


                <div class="explanation-step">

                    ${first} − ${second}
                    =
                    <strong>
                        ${answer}
                    </strong>

                </div>


                <div class="explanation-answer">

                    Answer: ${answer}

                </div>

            `;

            break;



        case "×":

            explanation = `

                <div class="explanation-step">

                    <strong>
                        Multiplication
                    </strong>

                </div>


                <div class="explanation-step">

                    Multiply
                    <strong>
                        ${first}
                    </strong>

                    by
                    <strong>
                        ${second}
                    </strong>.

                </div>


                <div class="explanation-step">

                    ${first} × ${second}
                    =
                    <strong>
                        ${answer}
                    </strong>

                </div>


                <div class="explanation-answer">

                    Answer: ${answer}

                </div>

            `;

            break;



        case "÷":

            explanation = `

                <div class="explanation-step">

                    <strong>
                        Division
                    </strong>

                </div>


                <div class="explanation-step">

                    Divide
                    <strong>
                        ${first}
                    </strong>

                    by
                    <strong>
                        ${second}
                    </strong>.

                </div>


                <div class="explanation-step">

                    ${first} ÷ ${second}
                    =
                    <strong>
                        ${answer}
                    </strong>

                </div>


                <div class="explanation-answer">

                    Answer: ${answer}

                </div>

            `;

            break;

    }


    explanationContent.innerHTML =
        explanation;

}



// ========================================
// HISTORY
// ========================================

const historyList =
    document.getElementById(
        "historyList"
    );

const clearHistoryButton =
    document.getElementById(
        "clearHistory"
    );


let calculationHistory =
    JSON.parse(
        localStorage.getItem(
            "calcoraHistory"
        )
    ) || [];



function addToHistory(
    expression,
    result
) {

    calculationHistory.unshift({

        expression:
            expression,

        result:
            result

    });


    calculationHistory =
        calculationHistory.slice(
            0,
            10
        );


    localStorage.setItem(
        "calcoraHistory",
        JSON.stringify(
            calculationHistory
        )
    );


    displayHistory();

}



function displayHistory() {

    if (
        calculationHistory.length === 0
    ) {

        historyList.innerHTML = `

            <p class="empty-history">

                No calculations yet

            </p>

        `;

        return;

    }


    historyList.innerHTML = "";


    calculationHistory.forEach(
        item => {

            const historyItem =
                document.createElement(
                    "div"
                );


            historyItem.className =
                "history-item";


            historyItem.innerHTML = `

                <div class="history-expression">

                    ${item.expression}

                </div>


                <div class="history-result">

                    = ${item.result}

                </div>

            `;


            historyList.appendChild(
                historyItem
            );

        }
    );

}



clearHistoryButton.addEventListener(
    "click",
    () => {

        calculationHistory = [];


        localStorage.removeItem(
            "calcoraHistory"
        );


        displayHistory();

    }
);


displayHistory();



// ========================================
// KEYBOARD SUPPORT
// ========================================

document.addEventListener(
    "keydown",
    event => {

        const key =
            event.key;


        if (
            !isNaN(key) ||
            key === "."
        ) {

            enterNumber(key);

            return;

        }


        if (
            ["+", "-", "*", "/"]
                .includes(key)
        ) {

            const operatorMap = {

                "+": "+",

                "-": "−",

                "*": "×",

                "/": "÷"

            };


            chooseOperator(
                operatorMap[key]
            );

            return;

        }


        if (
            key === "Enter" ||
            key === "="
        ) {

            event.preventDefault();

            calculate();

            return;

        }


        if (
            key === "Backspace"
        ) {

            deleteNumber();

            return;

        }


        if (
            key === "Escape"
        ) {

            clearCalculator();

            return;

        }


        if (
            key === "%"
        ) {

            percentage();

        }

    }
);



// ========================================
// MODE SWITCHING
// ========================================

const scientificPanel =
    document.getElementById(
        "scientificPanel"
    );

const financePanel =
    document.getElementById(
        "financePanel"
    );

const studentPanel =
    document.getElementById(
        "studentPanel"
    );

const modeButtons =
    document.querySelectorAll(
        ".mode"
    );



modeButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                modeButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const mode =
                    button.dataset.mode;


                scientificPanel.style.display =
                    mode === "scientific"
                        ? "block"
                        : "none";


                financePanel.style.display =
                    mode === "finance"
                        ? "block"
                        : "none";


                studentPanel.style.display =
                    mode === "student"
                        ? "block"
                        : "none";

            }
        );

    }
);



// ========================================
// SCIENTIFIC MODE
// ========================================

const scientificButtons =
    document.querySelectorAll(
        "[data-scientific]"
    );



function scientificResult(
    operation,
    answer,
    explanation
) {

    resultDisplay.textContent =
        answer;


    expressionDisplay.textContent =
        operation;


    explanationContent.innerHTML = `

        <div class="explanation-step">

            🧪
            <strong>
                Scientific calculation
            </strong>

        </div>


        <div class="explanation-step">

            ${explanation}

        </div>


        <div class="explanation-answer">

            Answer: ${answer}

        </div>

    `;


    addToHistory(
        operation,
        answer
    );

}



scientificButtons.forEach(
    button => {

        button.addEventListener(
            "click",
            () => {

                const operation =
                    button.dataset.scientific;


                const value =
                    parseFloat(
                        currentInput
                    );


                if (
                    operation !== "pi" &&
                    isNaN(value)
                ) {

                    explanationContent.innerHTML = `

                        <p>

                            Enter a number first,
                            then choose a scientific function.

                        </p>

                    `;

                    return;

                }


                let answer;



                switch (operation) {


                    case "sqrt":

                        if (value < 0) {

                            explanationContent.innerHTML = `

                                <p>
                                    √ cannot be calculated
                                    for a negative number.
                                </p>

                            `;

                            return;

                        }


                        answer =
                            Math.sqrt(value);


                        answer =
                            Number(
                                answer.toFixed(10)
                            );


                        scientificResult(
                            `√${value}`,
                            answer,
                            `The square root of ${value} is ${answer}.`
                        );

                        break;



                    case "square":

                        answer =
                            value ** 2;


                        answer =
                            Number(
                                answer.toFixed(10)
                            );


                        scientificResult(
                            `${value}²`,
                            answer,
                            `${value} × ${value} = ${answer}.`
                        );

                        break;



                    case "cube":

                        answer =
                            value ** 3;


                        answer =
                            Number(
                                answer.toFixed(10)
                            );


                        scientificResult(
                            `${value}³`,
                            answer,
                            `${value} × ${value} × ${value} = ${answer}.`
                        );

                        break;



                    case "sin":

                        answer =
                            Math.sin(
                                value *
                                Math.PI /
                                180
                            );


                        answer =
                            Number(
                                answer.toFixed(10)
                            );


                        scientificResult(
                            `sin(${value}°)`,
                            answer,
                            `The calculator converts ${value}° to radians before calculating sine.`
                        );

                        break;



                    case "cos":

                        answer =
                            Math.cos(
                                value *
                                Math.PI /
                                180
                            );


                        answer =
                            Number(
                                answer.toFixed(10)
                            );


                        scientificResult(
                            `cos(${value}°)`,
                            answer,
                            `The calculator converts ${value}° to radians before calculating cosine.`
                        );

                        break;



                    case "tan":

                        answer =
                            Math.tan(
                                value *
                                Math.PI /
                                180
                            );


                        answer =
                            Number(
                                answer.toFixed(10)
                            );


                        scientificResult(
                            `tan(${value}°)`,
                            answer,
                            `The calculator converts ${value}° to radians before calculating tangent.`
                        );

                        break;



                    case "log":

                        if (value <= 0) {

                            explanationContent.innerHTML = `

                                <p>
                                    Logarithm requires
                                    a positive number.
                                </p>

                            `;

                            return;

                        }


                        answer =
                            Math.log10(value);


                        answer =
                            Number(
                                answer.toFixed(10)
                            );


                        scientificResult(
                            `log(${value})`,
                            answer,
                            `This calculates the base-10 logarithm of ${value}.`
                        );

                        break;



                    case "ln":

                        if (value <= 0) {

                            explanationContent.innerHTML = `

                                <p>
                                    Natural logarithm requires
                                    a positive number.
                                </p>

                            `;

                            return;

                        }


                        answer =
                            Math.log(value);


                        answer =
                            Number(
                                answer.toFixed(10)
                            );


                        scientificResult(
                            `ln(${value})`,
                            answer,
                            `This calculates the natural logarithm of ${value}.`
                        );

                        break;



                    case "pi":

                        answer =
                            Math.PI;


                        answer =
                            Number(
                                answer.toFixed(10)
                            );


                        currentInput =
                            answer.toString();


                        scientificResult(
                            "π",
                            answer,
                            `π is approximately ${answer}.`
                        );

                        break;

                }

            }
        );

    }
);



// ========================================
// FINANCE MODE
// ========================================

const financeTools =
    document.querySelectorAll(
        ".finance-tool"
    );


const priceInput =
    document.getElementById(
        "priceInput"
    );


const discountInput =
    document.getElementById(
        "discountInput"
    );


const financeLabel1 =
    document.getElementById(
        "financeLabel1"
    );


const financeLabel2 =
    document.getElementById(
        "financeLabel2"
    );


const calculateFinanceButton =
    document.getElementById(
        "calculateFinance"
    );


const financeResult =
    document.getElementById(
        "financeResult"
    );


let currentFinanceTool =
    "discount";



financeTools.forEach(
    tool => {

        tool.addEventListener(
            "click",
            () => {

                financeTools.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                tool.classList.add(
                    "active"
                );


                currentFinanceTool =
                    tool.dataset.tool;


                updateFinanceForm();

            }
        );

    }
);



function updateFinanceForm() {

    if (
        currentFinanceTool ===
        "discount"
    ) {

        financeLabel1.textContent =
            "Original Price";


        financeLabel2.textContent =
            "Discount (%)";


        priceInput.placeholder =
            "Enter original price";


        discountInput.placeholder =
            "Enter discount percentage";

    }


    else if (
        currentFinanceTool ===
        "gst"
    ) {

        financeLabel1.textContent =
            "Amount";


        financeLabel2.textContent =
            "GST (%)";


        priceInput.placeholder =
            "Enter amount";


        discountInput.placeholder =
            "Enter GST percentage";

    }


    else if (
        currentFinanceTool ===
        "tip"
    ) {

        financeLabel1.textContent =
            "Bill Amount";


        financeLabel2.textContent =
            "Tip (%)";


        priceInput.placeholder =
            "Enter bill amount";


        discountInput.placeholder =
            "Enter tip percentage";

    }


    else if (
        currentFinanceTool ===
        "split"
    ) {

        financeLabel1.textContent =
            "Total Bill";


        financeLabel2.textContent =
            "Number of People";


        priceInput.placeholder =
            "Enter total bill";


        discountInput.placeholder =
            "People";

    }


    priceInput.value = "";

    discountInput.value = "";

    financeResult.textContent =
        "Enter values to calculate.";

}



calculateFinanceButton.addEventListener(
    "click",
    () => {

        const amount =
            parseFloat(
                priceInput.value
            );


        const value =
            parseFloat(
                discountInput.value
            );


        if (
            isNaN(amount) ||
            isNaN(value)
        ) {

            financeResult.textContent =
                "Please enter valid values.";

            return;

        }


        if (
            currentFinanceTool ===
            "discount"
        ) {

            const discount =
                amount *
                value /
                100;


            const finalPrice =
                amount -
                discount;


            financeResult.innerHTML = `

                Discount:
                <strong>
                    ₹${discount.toFixed(2)}
                </strong>

                <br>

                You pay:
                <strong>
                    ₹${finalPrice.toFixed(2)}
                </strong>

            `;

        }


        else if (
            currentFinanceTool ===
            "gst"
        ) {

            const gst =
                amount *
                value /
                100;


            const finalPrice =
                amount +
                gst;


            financeResult.innerHTML = `

                GST:
                <strong>
                    ₹${gst.toFixed(2)}
                </strong>

                <br>

                Final amount:
                <strong>
                    ₹${finalPrice.toFixed(2)}
                </strong>

            `;

        }


        else if (
            currentFinanceTool ===
            "tip"
        ) {

            const tip =
                amount *
                value /
                100;


            const total =
                amount +
                tip;


            financeResult.innerHTML = `

                Tip:
                <strong>
                    ₹${tip.toFixed(2)}
                </strong>

                <br>

                Total:
                <strong>
                    ₹${total.toFixed(2)}
                </strong>

            `;

        }


        else if (
            currentFinanceTool ===
            "split"
        ) {

            if (value <= 0) {

                financeResult.textContent =
                    "Number of people must be greater than 0.";

                return;

            }


            const eachPerson =
                amount /
                value;


            financeResult.innerHTML = `

                Total bill:
                <strong>
                    ₹${amount.toFixed(2)}
                </strong>

                <br>

                Each person pays:
                <strong>
                    ₹${eachPerson.toFixed(2)}
                </strong>

            `;

        }

    }
);



// ========================================
// STUDENT MODE
// ========================================

const studentTools =
    document.querySelectorAll(
        ".student-tool"
    );


const studentForm =
    document.getElementById(
        "studentForm"
    );


let currentStudentTool =
    "cgpa";



studentTools.forEach(
    tool => {

        tool.addEventListener(
            "click",
            () => {

                studentTools.forEach(
                    item => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                tool.classList.add(
                    "active"
                );


                currentStudentTool =
                    tool.dataset.tool;


                updateStudentForm();

            }
        );

    }
);



function updateStudentForm() {

    if (
        currentStudentTool ===
        "cgpa"
    ) {

        studentForm.innerHTML = `

            <label>
                Semester 1 CGPA
            </label>

            <input
                id="cgpa1"
                type="number"
                placeholder="Enter CGPA"
                step="0.01"
            >


            <label>
                Semester 2 CGPA
            </label>

            <input
                id="cgpa2"
                type="number"
                placeholder="Enter CGPA"
                step="0.01"
            >


            <label>
                Semester 3 CGPA
            </label>

            <input
                id="cgpa3"
                type="number"
                placeholder="Enter CGPA"
                step="0.01"
            >


            <button
                id="calculateStudent"
                class="student-calculate"
            >
                Calculate
            </button>


            <div
                class="student-result"
                id="studentResult"
            >
                Enter your values to calculate.
            </div>

        `;

    }


    else if (
        currentStudentTool ===
        "percentage"
    ) {

        studentForm.innerHTML = `

            <label>
                Marks Obtained
            </label>

            <input
                id="marksObtained"
                type="number"
                placeholder="Enter marks"
            >


            <label>
                Total Marks
            </label>

            <input
                id="totalMarks"
                type="number"
                placeholder="Enter total marks"
            >


            <button
                id="calculateStudent"
                class="student-calculate"
            >
                Calculate
            </button>


            <div
                class="student-result"
                id="studentResult"
            >
                Enter your values to calculate.
            </div>

        `;

    }


    else if (
        currentStudentTool ===
        "marks"
    ) {

        studentForm.innerHTML = `

            <label>
                Current Marks
            </label>

            <input
                id="currentMarks"
                type="number"
                placeholder="Marks obtained so far"
            >


            <label>
                Total Marks So Far
            </label>

            <input
                id="currentTotal"
                type="number"
                placeholder="Total marks so far"
            >


            <label>
                Target Percentage
            </label>

            <input
                id="targetPercentage"
                type="number"
                placeholder="Example: 80"
            >


            <button
                id="calculateStudent"
                class="student-calculate"
            >
                Calculate
            </button>


            <div
                class="student-result"
                id="studentResult"
            >
                Enter your values to calculate.
            </div>

        `;

    }


    else if (
        currentStudentTool ===
        "attendance"
    ) {

        studentForm.innerHTML = `

            <label>
                Classes Attended
            </label>

            <input
                id="attended"
                type="number"
                placeholder="Classes attended"
            >


            <label>
                Total Classes
            </label>

            <input
                id="totalClasses"
                type="number"
                placeholder="Total classes"
            >


            <button
                id="calculateStudent"
                class="student-calculate"
            >
                Calculate
            </button>


            <div
                class="student-result"
                id="studentResult"
            >
                Enter your values to calculate.
            </div>

        `;

    }


    document
        .getElementById(
            "calculateStudent"
        )
        .addEventListener(
            "click",
            calculateStudent
        );

}



function calculateStudent() {

    const result =
        document.getElementById(
            "studentResult"
        );



    if (
        currentStudentTool ===
        "cgpa"
    ) {

        const values = [

            parseFloat(
                document.getElementById(
                    "cgpa1"
                ).value
            ),

            parseFloat(
                document.getElementById(
                    "cgpa2"
                ).value
            ),

            parseFloat(
                document.getElementById(
                    "cgpa3"
                ).value
            )

        ];


        if (
            values.some(
                value => isNaN(value)
            )
        ) {

            result.textContent =
                "Please enter all CGPA values.";

            return;

        }


        const cgpa =
            values.reduce(
                (sum, value) =>
                    sum + value,
                0
            ) /
            values.length;


        result.innerHTML = `

            Average CGPA:
            <strong>
                ${cgpa.toFixed(2)}
            </strong>

        `;

    }



    else if (
        currentStudentTool ===
        "percentage"
    ) {

        const obtained =
            parseFloat(
                document.getElementById(
                    "marksObtained"
                ).value
            );


        const total =
            parseFloat(
                document.getElementById(
                    "totalMarks"
                ).value
            );


        if (
            isNaN(obtained) ||
            isNaN(total) ||
            total <= 0 ||
            obtained < 0 ||
            obtained > total
        ) {

            result.textContent =
                "Please enter valid marks.";

            return;

        }


        const percentage =
            obtained /
            total *
            100;


        result.innerHTML = `

            Percentage:
            <strong>
                ${percentage.toFixed(2)}%
            </strong>

        `;

    }



    else if (
        currentStudentTool ===
        "marks"
    ) {

        const current =
            parseFloat(
                document.getElementById(
                    "currentMarks"
                ).value
            );


        const total =
            parseFloat(
                document.getElementById(
                    "currentTotal"
                ).value
            );


        const target =
            parseFloat(
                document.getElementById(
                    "targetPercentage"
                ).value
            );


        if (
            isNaN(current) ||
            isNaN(total) ||
            isNaN(target) ||
            total <= 0
        ) {

            result.textContent =
                "Please enter valid values.";

            return;

        }


        const required =
            (
                target /
                100
            ) *
            total -
            current;


        result.innerHTML = `

            Additional marks needed:
            <strong>
                ${Math.max(
                    required,
                    0
                ).toFixed(2)}
            </strong>

        `;

    }



    else if (
        currentStudentTool ===
        "attendance"
    ) {

        const attended =
            parseFloat(
                document.getElementById(
                    "attended"
                ).value
            );


        const total =
            parseFloat(
                document.getElementById(
                    "totalClasses"
                ).value
            );


        if (
            isNaN(attended) ||
            isNaN(total) ||
            total <= 0 ||
            attended < 0 ||
            attended > total
        ) {

            result.textContent =
                "Please enter valid attendance values.";

            return;

        }


        const attendance =
            attended /
            total *
            100;


        result.innerHTML = `

            Attendance:
            <strong>
                ${attendance.toFixed(2)}%
            </strong>

        `;

    }

}



// ========================================
// NATURAL LANGUAGE CALCULATOR
// ========================================

const smartInput =
    document.getElementById(
        "smartInput"
    );


const smartCalculate =
    document.getElementById(
        "smartCalculate"
    );



smartCalculate.addEventListener(
    "click",
    processSmartCalculation
);



smartInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter"
        ) {

            processSmartCalculation();

        }

    }
);



function processSmartCalculation() {

    const text =
        smartInput.value
            .toLowerCase()
            .trim();


    if (!text) {

        explanationContent.innerHTML = `

            <p>

                Try something like
                <strong>
                    15% of 2000
                </strong>.

            </p>

        `;

        return;

    }



    // ====================================
    // PERCENTAGE OF
    // ====================================

    const percentageMatch =
        text.match(
            /([\d.]+)\s*%\s*(?:of|from)\s*([\d.]+)/
        );


    if (percentageMatch) {

        const percentage =
            parseFloat(
                percentageMatch[1]
            );


        const number =
            parseFloat(
                percentageMatch[2]
            );


        const answer =
            percentage /
            100 *
            number;


        resultDisplay.textContent =
            answer;


        expressionDisplay.textContent =
            `${percentage}% of ${number}`;


        explanationContent.innerHTML = `

            <div class="explanation-step">

                Find
                <strong>
                    ${percentage}%
                </strong>
                of
                <strong>
                    ${number}
                </strong>.

            </div>


            <div class="explanation-step">

                ${percentage} ÷ 100
                =
                <strong>
                    ${percentage / 100}
                </strong>

            </div>


            <div class="explanation-step">

                ${percentage / 100}
                ×
                ${number}
                =
                <strong>
                    ${answer}
                </strong>

            </div>


            <div class="explanation-answer">

                Answer: ${answer}

            </div>

        `;


        addToHistory(
            `${percentage}% of ${number}`,
            answer
        );


        return;

    }



    // ====================================
    // HALF OF
    // ====================================

    const halfMatch =
        text.match(
            /half\s+of\s+([\d.]+)/
        );


    if (halfMatch) {

        const number =
            parseFloat(
                halfMatch[1]
            );


        const answer =
            number / 2;


        resultDisplay.textContent =
            answer;


        expressionDisplay.textContent =
            `half of ${number}`;


        explanationContent.innerHTML = `

            <div class="explanation-step">

                Half means
                dividing by 2.

            </div>


            <div class="explanation-step">

                ${number} ÷ 2
                =
                <strong>
                    ${answer}
                </strong>

            </div>


            <div class="explanation-answer">

                Answer: ${answer}

            </div>

        `;


        addToHistory(
            `half of ${number}`,
            answer
        );


        return;

    }



    // ====================================
    // ADDITION
    // ====================================

    const additionMatch =
        text.match(
            /([\d.]+)\s*(?:\+|plus|add)\s*([\d.]+)/
        );


    if (additionMatch) {

        const first =
            parseFloat(
                additionMatch[1]
            );


        const second =
            parseFloat(
                additionMatch[2]
            );


        const answer =
            first + second;


        resultDisplay.textContent =
            answer;


        expressionDisplay.textContent =
            `${first} + ${second}`;


        showExplanation(
            first,
            second,
            "+",
            answer
        );


        addToHistory(
            `${first} + ${second}`,
            answer
        );


        return;

    }



    // ====================================
    // SUBTRACTION
    // ====================================

    const subtractionMatch =
        text.match(
            /([\d.]+)\s*(?:-|minus|subtract)\s*([\d.]+)/
        );


    if (subtractionMatch) {

        const first =
            parseFloat(
                subtractionMatch[1]
            );


        const second =
            parseFloat(
                subtractionMatch[2]
            );


        const answer =
            first - second;


        resultDisplay.textContent =
            answer;


        expressionDisplay.textContent =
            `${first} − ${second}`;


        showExplanation(
            first,
            second,
            "−",
            answer
        );


        addToHistory(
            `${first} − ${second}`,
            answer
        );


        return;

    }



    // ====================================
    // MULTIPLICATION
    // ====================================

    const multiplicationMatch =
        text.match(
            /([\d.]+)\s*(?:\*|x|×|times|multiply)\s*([\d.]+)/
        );


    if (multiplicationMatch) {

        const first =
            parseFloat(
                multiplicationMatch[1]
            );


        const second =
            parseFloat(
                multiplicationMatch[2]
            );


        const answer =
            first * second;


        resultDisplay.textContent =
            answer;


        expressionDisplay.textContent =
            `${first} × ${second}`;


        showExplanation(
            first,
            second,
            "×",
            answer
        );


        addToHistory(
            `${first} × ${second}`,
            answer
        );


        return;

    }



    // ====================================
    // DIVISION
    // ====================================

    const divisionMatch =
        text.match(
            /([\d.]+)\s*(?:\/|÷|divided by|divide)\s*([\d.]+)/
        );


    if (divisionMatch) {

        const first =
            parseFloat(
                divisionMatch[1]
            );


        const second =
            parseFloat(
                divisionMatch[2]
            );


        if (second === 0) {

            explanationContent.innerHTML = `

                <p>
                    ❌ Division by zero
                    is not allowed.
                </p>

            `;

            return;

        }


        const answer =
            first / second;


        const roundedAnswer =
            Number(
                answer.toFixed(10)
            );


        resultDisplay.textContent =
            roundedAnswer;


        expressionDisplay.textContent =
            `${first} ÷ ${second}`;


        showExplanation(
            first,
            second,
            "÷",
            roundedAnswer
        );


        addToHistory(
            `${first} ÷ ${second}`,
            roundedAnswer
        );


        return;

    }



    // ====================================
    // UNKNOWN
    // ====================================

    explanationContent.innerHTML = `

        <div class="explanation-step">

            🤔
            <strong>
                I couldn't understand that yet.
            </strong>

        </div>


        <div class="explanation-step">

            Try:

        </div>


        <div class="explanation-step">

            •
            <strong>
                15% of 2000
            </strong>

        </div>


        <div class="explanation-step">

            •
            <strong>
                half of 500
            </strong>

        </div>


        <div class="explanation-step">

            •
            <strong>
                20 plus 30
            </strong>

        </div>


        <div class="explanation-step">

            •
            <strong>
                100 minus 25
            </strong>

        </div>

    `;

}



// ========================================
// THEME
// ========================================

const themeToggle =
    document.getElementById(
        "themeToggle"
    );


const savedTheme =
    localStorage.getItem(
        "calcoraTheme"
    );


if (
    savedTheme === "light"
) {

    document.body.classList.add(
        "light"
    );


    themeToggle.textContent =
        "☀️";

}



themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );


        const isLight =
            document.body.classList.contains(
                "light"
            );


        themeToggle.textContent =
            isLight
                ? "☀️"
                : "☾";


        localStorage.setItem(
            "calcoraTheme",
            isLight
                ? "light"
                : "dark"
        );

    }
);