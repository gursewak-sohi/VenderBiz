(function() {
    // JS Loaded
    let body = document.body;
    body.classList.add('js-loaded');

    // AOS Init
    AOS.init({
        duration: 800,
        once: true, 
        easing: 'ease',
        disable: 'phone',
    });
  

    // Alpine Data
    document.addEventListener('alpine:init', () => {
        Alpine.data('aplineData', () => ({
          //   Language
          language: localStorage.getItem('language') || 'Portugese',
          setLanguage(newLanguage) {
            this.language = newLanguage;
            localStorage.setItem('language', newLanguage);  
          },
          
          // SignUp Form
          firstName: '',
          lastName: '',
          emailAddress: '',
          phoneNumber: '',

          isSignUpFormValid() {
            return (
                Object.keys(this.errors).length === 0 &&
                (this.annualEarnings !== null && this.annualEarnings !== undefined) &&
                this.growthRate &&
                (this.excessCompensation !== null && this.excessCompensation !== undefined) &&
                (this.yearsEarningsContinue !== null && this.yearsEarningsContinue !== undefined) &&
                this.marketabilityDiscount
            );
          },

          // Calculator Form Data
          showResults: false,
          isShowingResults: false,
          calcBtnText : 'Calculate valuation',
          annualEarnings: '',
          growthRate: '',
          selectedRiskLevel: 0.10,
          selectedRiskLevelLabel: 'Average',
          excessCompensation: '',
          yearsEarningsContinue: '',
          marketabilityDiscount: '',
          errors: {},
          riskLevel: [
            { id: 1, value: 0.03, label: 'None' },
            { id: 2, value: 0.065, label: 'Low' },
            { id: 3, value: 0.10, label: 'Average' },
            { id: 4, value: 0.135, label: 'Considerable' },
            { id: 5, value: 0.17, label: 'High' }
        ],

        // Field Validator
        validateField(field) {
          switch (field) {
            case 'firstName':
              if (!this.firstName === null || this.firstName === '') {
                this.errors.firstName = 'First name can not be empty';
              } else {
                delete this.errors.firstName;
              }
              break;

            case 'lastName':
                if (!this.lastName === null || this.lastName === '') {
                  this.errors.lastName = 'Last name can not be empty';
                } else {
                  delete this.errors.lastName;
                }
                break;  
              
            case 'emailAddress':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.emailAddress === null || this.emailAddress === '') {
                    this.errors.emailAddress = 'Email address cannot be empty';
                } else if (!emailRegex.test(this.emailAddress)) {
                    this.errors.emailAddress = 'Invalid email address';
                } else {
                    delete this.errors.emailAddress;
                }
                break;

            case 'phoneNumber':
                const phoneRegex = /^\+?[1-9]\d{1,14}$/;
                if (this.phoneNumber === null || this.phoneNumber === '') {
                    this.errors.phoneNumber = 'Phone number cannot be empty';
                } else if (!phoneRegex.test(this.phoneNumber)) {
                    this.errors.phoneNumber = 'Invalid phone number';
                } else {
                    delete this.errors.phoneNumber;
                }
                break; 

            case 'annualEarnings':
              if (!this.annualEarnings === null || this.annualEarnings === '') {
                this.errors.annualEarnings = 'Annual earnings can not be empty';
              } else if (isNaN(this.annualEarnings)) {
                this.errors.annualEarnings = 'Annual earnings must be a number';
              } else {
                delete this.errors.annualEarnings;
              }
              break;
            case 'growthRate':
              if (!this.growthRate || !/^(\d+(\.\d+)?|\.\d+)%?$/.test(this.growthRate)) {
                this.errors.growthRate = 'Please enter a valid growth rate percentage';
              } else if (parseFloat(this.growthRate) < 0 || parseFloat(this.growthRate) > 100) {
                this.errors.growthRate = 'Please enter a valid growth rate between 0 and 100%';
              } else {
                if (!this.growthRate.includes('%')) {
                  this.growthRate += '%';
                }
                delete this.errors.growthRate;
              }
              break;  
            case 'excessCompensation':
              if (!this.excessCompensation === null || this.excessCompensation === '') {
                this.errors.excessCompensation = 'Excess compensation can not be empty';
              } else if (isNaN(this.excessCompensation)) {
                this.errors.excessCompensation = 'Excess compensation must be a number';
              } else {
                delete this.errors.excessCompensation;
              }
              break;  
            // case 'yearsEarningsContinue':
            //   if (!this.excessCompensation === null || this.excessCompensation === '' || isNaN(this.yearsEarningsContinue) || this.yearsEarningsContinue < 0 || this.yearsEarningsContinue > 10) {
            //     this.errors.yearsEarningsContinue = 'Please enter a valid number of years between 0 and 10';
            //   } else {
            //     delete this.errors.yearsEarningsContinue;
            //   }
            //   break;

            case 'yearsEarningsContinue':
                if (!this.yearsEarningsContinue === null || this.yearsEarningsContinue === '') {
                  this.errors.yearsEarningsContinue = 'Earning years can not be empty';
                } else if (isNaN(this.yearsEarningsContinue)) {
                  this.errors.yearsEarningsContinue = 'Earning years must be a number';
                } 
                else if (this.yearsEarningsContinue < 0 || this.yearsEarningsContinue > 10) {
                  this.errors.yearsEarningsContinue = 'Please enter a valid number of years between 0 and 10';
                }
                else {
                  delete this.errors.yearsEarningsContinue;
                }
                break; 

            case 'marketabilityDiscount':
                if (!this.marketabilityDiscount || !/^(-?\d+(\.\d+)?|\.\d+)%?$/.test(this.marketabilityDiscount)) {
                  this.errors.marketabilityDiscount = 'Please enter a valid discount percentage';
                } else if (parseFloat(this.marketabilityDiscount) < -100 || parseFloat(this.marketabilityDiscount) > 100) {
                  this.errors.marketabilityDiscount = 'Please enter a valid discount between -100% and 100%';
                } else {
                  if (!this.marketabilityDiscount.includes('%')) {
                    this.marketabilityDiscount += '%';
                  }
                  delete this.errors.marketabilityDiscount;
                }
                break;
            }
        },
    
        isCalcFormValid() {
          return (
              Object.keys(this.errors).length === 0 &&
              (this.annualEarnings !== null && this.annualEarnings !== undefined) &&
              this.growthRate &&
              (this.excessCompensation !== null && this.excessCompensation !== undefined) &&
              (this.yearsEarningsContinue !== null && this.yearsEarningsContinue !== undefined) &&
              this.marketabilityDiscount
          );
        },

        customRound(value) {
          return (value % 1 >= 0.5) ? Math.ceil(value) : Math.floor(value);
        },

        totalFutureEarnings :  '',
        totalDiscountedValue :  '',
        result: 0.00,
        calculateValuation() {
        if (this.isCalcFormValid()) {
            this.isShowingResults = true;
            this.calcBtnText = 'Calculating..';

            // Calculation Logic
            const annualEarnings = parseFloat(this.annualEarnings);
            const growthRate = parseFloat(this.growthRate.replace('%', '')) / 100;
            const selectedRiskLevel = parseFloat(this.selectedRiskLevel);
            const excessCompensation = parseFloat(this.excessCompensation);
            // const yearsEarningsContinue = parseInt(this.yearsEarningsContinue, 10);
            const yearsEarningsContinue = 10;
            const marketabilityDiscount = parseFloat(this.marketabilityDiscount.replace('%', '')) / 100;

            let totalFutureEarnings = 0;
            let totalDiscountedValue = 0;

            const tableData = [];

            for (let t = 1; t <= yearsEarningsContinue; t++) {
                const futureEarnings = (annualEarnings + excessCompensation) * Math.pow(1 + growthRate, t - 1);
                const discountedValue = (t === 1) ? futureEarnings : futureEarnings / Math.pow(1 + selectedRiskLevel, t - 1);

                totalFutureEarnings += futureEarnings;
                totalDiscountedValue += discountedValue;

                tableData.push({
                    year: t,
                    futureEarnings: futureEarnings,
                    discountedValue: discountedValue
                });
            }

            const adjustedPresentValue = this.customRound(totalDiscountedValue * (1 - marketabilityDiscount));

            this.result = adjustedPresentValue;

            // console.table(tableData);
            // console.log("Total future earnings:", totalFutureEarnings);
            // console.log("Present value of earnings:", totalDiscountedValue);
            // console.log("Adjusted present value:", adjustedPresentValue);
            // console.log("Discount rate:", selectedRiskLevel);
            // console.log("Marketability discount:", marketabilityDiscount);

            setTimeout(() => {
                this.showResults = true;
                this.isShowingResults = false,
                this.calcBtnText = 'Calculate valuation';
            }, 2000);
          }
        }
        }))
    })

})();