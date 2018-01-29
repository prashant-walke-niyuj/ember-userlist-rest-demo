import DS from 'ember-data';
import attr from 'ember-data/attr';
export default DS.Model.extend({
  username: DS.attr('string'),
  first_name: DS.attr('string'),
  last_name: DS.attr('string'),
  email: DS.attr('string'),
  active: DS.attr('boolean'),
});