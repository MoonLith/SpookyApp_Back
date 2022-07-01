
export interface PlantDataResponse{
    temperature : number,
    humidity : number,
    luminosity : number,
    humidity_soil : number,
}

export function plantDataToResponse(data : any): PlantDataResponse{

    return {
        temperature : data.temperature?.N,
        humidity :  data.humidity?.N,
        luminosity : data.luminosity?.N,
        humidity_soil: data.humidity_soil?.N,
    }
}
