export function checkEligibility(aps, programmes){

  return programmes.map((programme)=>{

    let status = "";

    if(aps >= programme.minAPS){
      status = "Eligible";
    }

    else if(aps >= programme.minAPS - 2){
      status = "Borderline";
    }

    else{
      status = "Not Eligible";
    }

    return{
      ...programme,
      status
    };

  });

}