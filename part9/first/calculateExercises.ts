
interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }

const calculateExercises=(hour : Array<number>, t : number):Result =>{
    const days= hour.length;
    const workday= hour.filter(h=>h>0).length;
    const average = hour.reduce( (a,b) => a+b )/days;
    const target = t;
    const success = average >= target;
    const rating = Math.round(average) > 3? 3 : Math.round(average) ;
    const rat_desc =rating ==2 ? "not too bad but could be better": rating==1?"bad":"well done";



    return{
        periodLength: days,
        trainingDays: workday,
        success: success,
        rating: rating,
        ratingDescription: rat_desc,
        target: target,
        average: average
      };
};

if(process.argv.length>4){
  const val: Array<number> = [];
  for (let i = 4; i < process.argv.length; i++) {
    val.push(Number(process.argv[i]));
  }
  console.log(calculateExercises(val,Number(process.argv[3])));
}
export default calculateExercises;