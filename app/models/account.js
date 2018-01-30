import DS from 'ember-data';
import attr from 'ember-data/attr';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  username: validator('presence', true),  
  first_name: validator('presence', true),  
  email: [
    validator('presence', true),
    validator('format', { type: 'email' })
  ]
});
export default DS.Model.extend(Validations,{
  username: DS.attr('string'),
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  email: DS.attr('string'),
  active: DS.attr('boolean'),
});