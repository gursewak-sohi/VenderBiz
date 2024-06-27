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
            this.updateDataWithLangChange(); 
          },
          init() {
            this.updateDataWithLangChange();
          },
          
          // SignUp Form
          // firstName: '',
          // lastName: '',
          // emailAddress: '',
          // phoneNumber: '',

          // isSignUpFormValid() {
          //   return (
          //       Object.keys(this.errors).length === 0 &&
          //       (this.annualEarnings !== null && this.annualEarnings !== undefined) &&
          //       this.growthRate &&
          //       (this.excessCompensation !== null && this.excessCompensation !== undefined) &&
          //       (this.yearsEarningsContinue !== null && this.yearsEarningsContinue !== undefined) &&
          //       this.marketabilityDiscount
          //   );
          // },

          // Calculator Form Data
          showResults: false,
          isShowingResults: false,
          calcBtnText : '',
          annualEarnings: '',
          growthRate: '',
          selectedRiskLevel: 0.10,
          selectedRiskLevelLabel: '',
          excessCompensation: '',
          yearsEarningsContinue: '',
          marketabilityDiscount: '',
          errors: {},
          riskLevel: [],

          updateDataWithLangChange() {
            this.riskLevel = [
                { id: 1, value: 0.03, label: this.language === 'English' ? 'None' : 'Nenhum' },
                { id: 2, value: 0.065, label: this.language === 'English' ? 'Low' : 'Baixo' },
                { id: 3, value: 0.10, label: this.language === 'English' ? 'Average' : 'Média' },
                { id: 4, value: 0.135, label: this.language === 'English' ? 'Considerable' : 'Considerável' },
                { id: 5, value: 0.17, label: this.language === 'English' ? 'High' : 'Alto' }
            ];
            this.calcBtnText = this.language === 'English' ? 'Calculate valuation' : 'Calcular avaliação';
            this.selectedRiskLevelLabel = this.language === 'English' ? 'Average' : 'Média';
        },

        // Field Validator
        validateField(field) {
          switch (field) {
            // case 'firstName':
            //   if (!this.firstName === null || this.firstName === '') {
            //     this.errors.firstName = this.language === 'English' ? 'First name can not be empty' : 'O primeiro nome não pode ficar vazio';
            //   } else {
            //     delete this.errors.firstName;
            //   }
            //   break;

            // case 'lastName':
            //     if (!this.lastName === null || this.lastName === '') {
            //       this.errors.lastName = this.language === 'English' ? 'Last name can not be empty' : 'O sobrenome não pode ficar vazio';
            //     } else {
            //       delete this.errors.lastName;
            //     }
            //     break;  
              
            // case 'emailAddress':
            //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            //     if (this.emailAddress === null || this.emailAddress === '') {
            //         this.errors.emailAddress = 'Email address cannot be empty';
            //     } else if (!emailRegex.test(this.emailAddress)) {
            //         this.errors.emailAddress = 'Invalid email address';
            //     } else {
            //         delete this.errors.emailAddress;
            //     }
            //     break;

            // case 'phoneNumber':
            //     const phoneRegex = /^\+?[1-9]\d{1,14}$/;
            //     if (this.phoneNumber === null || this.phoneNumber === '') {
            //         this.errors.phoneNumber = 'Phone number cannot be empty';
            //     } else if (!phoneRegex.test(this.phoneNumber)) {
            //         this.errors.phoneNumber = 'Invalid phone number';
            //     } else {
            //         delete this.errors.phoneNumber;
            //     }
            //     break; 

            case 'annualEarnings':
              if (!this.annualEarnings === null || this.annualEarnings === '') {
                this.errors.annualEarnings = this.language === 'English' ? 'Annual earnings can not be empty' : 'Os ganhos anuais não podem ficar vazios';
              } else if (isNaN(this.annualEarnings)) {
                this.errors.annualEarnings = this.language === 'English' ? 'Annual earnings must be a number' : 'Os ganhos anuais devem ser um número';
              } else {
                delete this.errors.annualEarnings;
              }
              break;
            case 'growthRate':
              if (!this.growthRate || !/^(\d+(\.\d+)?|\.\d+)%?$/.test(this.growthRate)) {
                this.errors.growthRate = this.language === 'English' ? 'Please enter a valid growth rate percentage' : 'Insira uma porcentagem de taxa de crescimento válida';
              } else if (parseFloat(this.growthRate) < 0 || parseFloat(this.growthRate) > 100) {
                this.errors.growthRate = this.language === 'English' ? 'Please enter a valid growth rate between 0 and 100%' : 'Insira uma taxa de crescimento válida entre 0 e 100%';
              } else {
                if (!this.growthRate.includes('%')) {
                  this.growthRate += '%';
                }
                delete this.errors.growthRate;
              }
              break;  
            case 'excessCompensation':
              if (!this.excessCompensation === null || this.excessCompensation === '') {
                this.errors.excessCompensation = this.language === 'English' ? 'Excess compensation can not be empty' : 'O excesso de compensação não pode ficar vazio';
              } else if (isNaN(this.excessCompensation)) {
                this.errors.excessCompensation = this.language === 'English' ? 'Excess compensation must be a number' : 'O excesso de compensação deve ser um número'; 
              } else {
                delete this.errors.excessCompensation;
              }
              break;  
          

            case 'yearsEarningsContinue':
                if (!this.yearsEarningsContinue === null || this.yearsEarningsContinue === '') {
                  this.errors.yearsEarningsContinue = this.language === 'English' ? 'Earning years can not be empty' : 'Ganhar anos não pode ficar vazio';
                } else if (isNaN(this.yearsEarningsContinue)) {
                  this.errors.yearsEarningsContinue = this.language === 'English' ? 'Earning years must be a number' : 'Os anos de ganho devem ser um número';
                } 
                else if (this.yearsEarningsContinue < 0 || this.yearsEarningsContinue > 10) {
                  this.errors.yearsEarningsContinue = this.language === 'English' ? 'Please enter a valid number of years between 0 and 10' : 'Insira um número válido de anos entre 0 e 10';
                }
                else {
                  delete this.errors.yearsEarningsContinue;
                }
                break; 

            case 'marketabilityDiscount':
                if (!this.marketabilityDiscount || !/^(-?\d+(\.\d+)?|\.\d+)%?$/.test(this.marketabilityDiscount)) {
                  this.errors.marketabilityDiscount = this.language === 'English' ? 'Please enter a valid discount percentage' : 'Insira uma porcentagem de desconto válida';
                } else if (parseFloat(this.marketabilityDiscount) < -100 || parseFloat(this.marketabilityDiscount) > 100) {
                  this.errors.marketabilityDiscount = this.language === 'English' ? 'Please enter a valid discount between -100% and 100%' : 'Insira um desconto válido entre -100% e 100%';
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
            this.calcBtnText = this.language === 'English' ? 'Calculating..' : 'Calculando..';

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
                this.calcBtnText = this.language === 'English' ? 'Calculate valuation' : 'Calcular avaliação';
            }, 2000);
          }
        }
        }))
    })

})();