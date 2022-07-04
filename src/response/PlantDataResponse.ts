
export interface PlantDataResponse{
    temperature : number,
    humidity : number,
    luminosity : number,
    humidity_soil : number,
}

export function plantDataToResponse(data : any): PlantDataResponse{

    return {
        temperature : (data.temperature?.N) ?  data.temperature?.N : "0.00",
        humidity :  (data.humidity?.N) ?  data.humidity?.N : "0.00",
        luminosity : (data.luminosity?.N) ? data.luminosity?.N:"0.00",
        humidity_soil: (data.humidity_soil?.N) ?  data.humidity_soil?.N: "0.00",
    }
}
