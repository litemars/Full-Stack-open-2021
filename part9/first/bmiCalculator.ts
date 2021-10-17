const calculateBmi = (height: number, weight: number): string => {
    if(height===0 && weight===null)return "no values";
    const bmi = weight / (height / 100) ** 2;
    if (bmi < 15) {
        return "Very underweight";
    }
    if (bmi < 16) {
      return "Underweight";
    } 
    if (bmi < 18.5) {
       return "Slightly underweight";
    }
    if (bmi < 25) {
       return "Normal (healthy weight)";
    }
    if (bmi < 30) {
      return "Overweight";
    }
    if (bmi < 35) {
      return "slightly overweight";
    }
    if (bmi < 40) {
      return "Very overweight";
    } 
    if(bmi>=40) {
      return "Obese";
    }
    return "";

  };

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);
console.log(calculateBmi(height, weight));
export default calculateBmi;