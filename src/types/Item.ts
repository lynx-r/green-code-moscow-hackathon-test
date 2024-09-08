import type { ItemType } from './ItemType'
import type Point from './Point'

export default interface Item {
  id: string
  point: Point
  address_name: string
  full_name: string
  name: string
  purpose_name: string
  type: ItemType
}
