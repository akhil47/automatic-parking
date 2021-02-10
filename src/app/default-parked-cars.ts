export const defaultParkedCars = [
    {
        vehicleNo: 'KA23XY1234',
        color: 'Red',
        inTime: new Date()
      },
      {
        vehicleNo: 'KA12XY4312',
        color: 'Yellow',
        inTime: new Date()
      },
      {
        vehicleNo: 'KA22XY5634',
        color: 'Blue',
        inTime: new Date()
      },
      {
        vehicleNo: 'KA24XY1294',
        color: 'Red',
        inTime: new Date()
      },
      {
        vehicleNo: 'KA32XY1034',
        color: 'Purple',
        inTime: new Date()
      }
]

export interface ParkingLot{
  availableSlots: number,
  parkedCarsList: Array<any>
}