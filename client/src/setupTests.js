import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount, shallow, render } from 'enzyme';
configure({
  adapter: new Adapter(),
  disableLifecycleMethods: true
});

import Overview from './components/Overview/Overview.jsx';


describe('MyComponent', () => {
  it('should render correctly in "debug" mode', () => { // example stuff
    const component = shallow(<Overview debug />);

    expect(component).toMatchSnapshot();
  });

  it('should render banner text correctly with given strings', () => {
    const productId = '21111';
    const component = shallow(<Overview productId={productId} />);

    expect(component).toMatchSnapshot();

});