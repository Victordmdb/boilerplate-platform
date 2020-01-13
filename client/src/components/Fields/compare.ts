import { get, isEqual } from "lodash";

type PossibleFieldTypes = 'values' | 'errors' | 'touched';

interface DynamicObject {
  [name: string]: any;
};

interface Props extends DynamicObject {
  values    : DynamicObject;
  errors    : DynamicObject;
  touched   : DynamicObject;
};

const compare = (fields: ReadonlyArray<string>) => (
    current : Props,
    next    : Props
  ): boolean => {
    const compare   = (type: PossibleFieldTypes) => (field: string) =>!isEqual( get(current[type], field), get(next[type],field) );
    const test      = (type: PossibleFieldTypes) => fields.some(compare(type));
    return test('values') || test('errors') || test('touched');
};
  
export default compare;