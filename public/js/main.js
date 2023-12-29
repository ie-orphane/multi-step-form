const nameInput = document.getElementById('name')
const emailInput = document.getElementById('email')
const phoneNumberInput = document.getElementById('phonenumber')

class Char {
    static specials = `!"#$%&'()*+,-./:;<=>?@[\]^_` + '`{|}~♂♀'
    static letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    static email = "abcdefghijklmnopqrstuvwxyz@.0123456789-_"
    static numbers = '0123456789 +'
}

const Prices = {
    'Arcade': { m: 9, y: 90 },
    'Advanced': { m: 12, y: 120 },
    'Pro': { m: 15, y: 150 },
    'Online Service': { m: 1, y: 10 },
    'Larger Storage': { m: 2, y: 20 },
    'Customizable Profile': { m: 2, y: 20 }
}

class Plan {
    durations() {
        return {
            y: {
                short: 'yr',
                normal: 'year',
                long: 'Yearly'
            },
            m: {
                short: 'mo',
                normal: 'month',
                long: 'Monthly'
            }
        }[this.duration]
    }

    constructor() {
        this.duration = 'm'
        this.shortDuration = 'mo'
        this.normalDuration = 'month'
        this.longDuration = 'Monthly'
        this.addOn = []
    }

    toggle_duration() {
        if (this.duration == 'm') {
            this.duration = 'y'
            this.shortDuration = 'yr'
            this.normalDuration = 'year'
            this.longDuration = 'Yearly'
        } else {
            this.duration = 'm'
            this.shortDuration = 'mo'
            this.normalDuration = 'month'
            this.longDuration = 'Monthly'
        }
    }
}

const PLAN = new Plan()

// go back inputs event listner
for (const goback of document.querySelectorAll('.go-back')) {
    goback.addEventListener('click', () => {
        const n = goback.dataset.order
        // switch the sections
        document.querySelector(`.step-${n}`).classList.remove('active')
        document.querySelector(`.step-${n - 1}`).classList.add('active')

        // switch the steps indicator in the sidebar
        document.querySelector(`.circle-${n}`).classList.remove('active')
        document.querySelector(`.circle-${n - 1}`).classList.add('active')
    })
}

const step1Section = document.querySelector('.step-1')
const step1Btn = step1Section.querySelector('.next-step')

const step1Labels = step1Section.querySelectorAll('label')
const step1Inputs = step1Section.querySelectorAll('input')

for (let i = 0; i < 3; i++) {
    const label = step1Labels[i]
    const input = step1Inputs[i]

    input.addEventListener('focusin', () => {
        label.dataset.error = ""
        input.classList.replace('border--strawberryred', 'border--lightgray')
    })

    switch (input.id) {
        case 'phonenumber':
            input.addEventListener("keydown", function (e) {
                if (e.key === undefined) {
                    return
                }

                if ((e.key == '+' && input.value != '') ||
                    ((e.key == ' ') && (input.value == '' || input.value.at(-1) == ' ')) ||
                    (!Char.numbers.includes(e.key) && e.key.length == 1)) {
                    e.preventDefault()
                }
            })
            break
        case 'email':
            input.addEventListener("keydown", function (e) {
                if (e.key === undefined) {
                    return
                }

                if ((!Char.email.includes(e.key) && e.key.length == 1) ||
                    (e.key == '@' && input.value.includes('@')) ||
                    (e.key == '.' && input.value.at(-1) == '.')) {
                    e.preventDefault()
                }
            })
            break
    }
}


//& Step 1
step1Btn.addEventListener('click', function () {
    this.error_msg = function (content) {
        this.label.dataset.error = content
        this.input.classList.replace('border--lightgray', 'border--strawberryred')
    }

    this.check_name = function () {
        let fullName = this.input.value
        // - Do not save empty full name
        if (!fullName) {
            return { error: true, output: "This field is required" }
        }

        // - delete spaces at the begining and the end.
        // - delete duplicate spaces.
        fullName = fullName.split(' ').filter(element => element != '')

        // - Do not save a full name has less than 5 characters (excluding spaces).
        const fullNameLength = fullName.reduce((acc, word) => acc + word.length, 0)
        if (fullNameLength < 5) {
            return { error: true, output: `Name should have more than ${fullNameLength} character(s)` }
        }


        for (const word of fullName) {
            // - Do not save a full Name contains numbers or special characters
            for (const letter of word) {
                if (!Char.letters.includes(letter)) {
                    return { error: true, output: `Name should not contain ${letter}` }
                }
            }
            // - capitalized each word.
            fullName[fullName.indexOf(word)] = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        }

        return { error: false, output: fullName.join(' ') }
    }

    // Full Name
    this.input = step1Section.querySelector('#name')
    this.label = this.input.previousElementSibling

    this.returnput = this.check_name()
    if (this.returnput.error) {
        this.error_msg(this.returnput.output)
        return
    }

    PLAN.name = this.returnput.output

    // Email
    this.check_email = function () {
        let email = this.input.value

        // - Do not save empty full name
        if (!email) {
            return { error: true, output: "This field is required" }
        }

        if (!email.includes('@') || !email.split('@')[1].includes('.')) {
            return { error: true, output: "Email not completed" }
        }

        if (email.split('@')[0] == "") {
            return { error: true, output: "Email missing" }
        }

        return { error: false, output: email }
    }


    this.input = step1Inputs[1]
    this.label = step1Labels[1]

    this.returnput = this.check_email()
    if (this.returnput.error) {
        this.error_msg(this.returnput.output)
        return
    }

    PLAN.email = this.returnput.output

    // Phone Number
    this.check_phonenumber = function () {
        let phoneNumber = this.input.value

        // - Do not save empty full name
        if (!phoneNumber) {
            return { error: true, output: "This field is required" }
        }

        return { error: false, output: phoneNumber }
    }


    this.input = step1Inputs[2]
    this.label = step1Labels[2]

    this.returnput = this.check_phonenumber()
    if (this.returnput.error) {
        this.error_msg(this.returnput.output)
        return
    }

    PLAN.phone = this.returnput.output

    step1Section.classList.remove('active')
    step1Section.nextElementSibling.classList.add('active')

    document.querySelector('.circle-1').classList.remove('active')
    document.querySelector('.circle-2').classList.add('active')
})

//& Step 2
const step2Section = document.querySelector('.step-2')
const step2Btn = step2Section.querySelector('.next-step')

const plans = document.querySelectorAll('.plan')
for (const plan of plans) {
    plan.addEventListener('click', () => {
        plans.forEach(plan => plan.classList.remove('selected'))
        plan.classList.add('selected')
    })
}

const planToggle = document.getElementById('plan-toggle')
planToggle.addEventListener('click', () => {
    if (planToggle.checked) {
        PLAN.toggle_duration()
        document.querySelector('.monthly').classList.replace('text--marineblue', 'text--coolgray')
        document.querySelector('.yearly').classList.replace('text--coolgray', 'text--marineblue')

        document.querySelectorAll('.plan-option').forEach(option => {
            option.innerHTML = option.innerHTML.replace('/mo', '0/yr')
            option.innerHTML += '<p class="fs-7 fw-medium text--marineblue">2 months free</p>'
        })
    } else {
        PLAN.toggle_duration()
        document.querySelector('.yearly').classList.replace('text--marineblue', 'text--coolgray')
        document.querySelector('.monthly').classList.replace('text--coolgray', 'text--marineblue')

        document.querySelectorAll('.plan-option').forEach(option => {
            option.innerHTML = option.innerHTML.replace('0/yr', '/mo')
            option.innerHTML = option.innerHTML.slice(0, option.innerHTML.lastIndexOf('<p class="fs-7 fw-medium text--marineblue">2 months free</p>'))
        })
    }
})

step2Btn.addEventListener('click', () => {
    plans.forEach(plan => {
        if (plan.classList.contains('selected')) {
            step2Section.classList.remove('active')
            step2Section.nextElementSibling.classList.add('active')

            document.querySelector('.circle-2').classList.remove('active')
            document.querySelector('.circle-3').classList.add('active')

            PLAN.plan = plan.querySelector('.plan-option>h6').textContent
            document.querySelectorAll('.add-on-price').forEach(price => {
                price.textContent = `$${Prices[price.dataset.for][PLAN.duration]}/${PLAN.shortDuration}`
            })
        }
    })
})

//& Step 3
const step3Section = document.querySelector('.step-3')
const step3Btn = step3Section.querySelector('.next-step')

step3Btn.addEventListener('click', () => {
    PLAN.addOn = []
    document.querySelectorAll('.add-one').forEach(addOn => {
        if (addOn.checked) {
            PLAN.addOn.push(addOn.name)
        }
    })

    step3Section.classList.remove('active')
    step3Section.nextElementSibling.classList.add('active')

    document.querySelector('.circle-3').classList.remove('active')
    document.querySelector('.circle-4').classList.add('active')

    let total = Prices[PLAN.plan][PLAN.duration]
    document.querySelector('.plan-o').textContent = `${PLAN.plan} (${PLAN.longDuration})`
    document.querySelector('.plan-o-price').textContent = `$${total}/${PLAN.shortDuration}`

    document.getElementById('addon-summary').innerHTML = ''
    PLAN.addOn.forEach(addon => {
        total += Prices[addon][PLAN.duration]
        document.getElementById('addon-summary').innerHTML += `
            <div class="d-flex align-items-center">
                <h6 class="text--coolgray fw-medium opacity-75">${addon}</h6>
                <p class="ms-auto text--marineblue fw-medium">+$${Prices[addon][PLAN.duration]}/${PLAN.shortDuration}</p>
            </div>`
    })


    document.querySelector('#total').textContent = `Total (per ${PLAN.normalDuration})`
    document.querySelector('#total-price').textContent = `+$${total}/${PLAN.shortDuration}`
})

document.querySelector('.confirm').addEventListener('click', () => {
    document.querySelector('.step-4').classList.remove('active')
    document.querySelector('.step-4').nextElementSibling.classList.add('active')
})