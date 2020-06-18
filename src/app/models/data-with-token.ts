export class DataWithToken {
    installDate: string;
    machineLifeinMonths: string;
    model: string;
    serialNumber: string;
    sheetCapability: string;
    speedColor: string;
    speedMono: string;
    typeofContract: string;
    
    constructor(
        installDate: string,
        machineLifeinMonths: string,
        model: string,
        serialNumber: string,
        sheetCapability: string,
        speedColor: string,
        speedMono: string,
        typeofContract: string       
    ){
        this.installDate = installDate;
        this.machineLifeinMonths = machineLifeinMonths;
        this.model = model;
        this.serialNumber = serialNumber;
        this.sheetCapability = sheetCapability;
        this.speedColor = speedColor;
        this.speedMono = speedMono;
        this.typeofContract = typeofContract;

    }
}
