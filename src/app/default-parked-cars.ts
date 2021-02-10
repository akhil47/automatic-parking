export const defaultParkedCars = [
    {
        vehicleNo: 'KA-XY-1234',
        color: 'Red',
        inTime: new Date()
      },
      {
        vehicleNo: 'KA-XY-4312',
        color: 'Yellow',
        inTime: new Date()
      },
      {
        vehicleNo: 'KA-XY-5634',
        color: 'Blue',
        inTime: new Date()
      },
      {
        vehicleNo: 'KA-XY-1294',
        color: 'Red',
        inTime: new Date()
      },
      {
        vehicleNo: 'KA-XY-1034',
        color: 'Purple',
        inTime: new Date()
      }
]

export interface ParkingLot{
  availableSlots: number,
  parkedCarsList: Array<any>
}