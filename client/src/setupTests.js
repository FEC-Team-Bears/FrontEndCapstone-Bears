import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, render } from 'enzyme';
configure({ adapter: new Adapter() });

import Overview from './components/Overview/Overview.jsx';
describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => { // example stuff
    const component = shallow(<MyComponent debug />);

    expect(component).toMatchSnapshot();
  });
});