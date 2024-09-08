import type Meta from './Meta'
import { type Result } from './Result'

export default interface Response {
  meta: Meta
  result: Result
}
