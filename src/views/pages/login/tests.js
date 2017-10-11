import { shallow } from 'enzyme';
import { LoginPage } from './login';

describe('Login Page Component', () => {
  const props = LoginPage.defaultProps;

  it('renders an email input', () => {
    const el = shallow(<LoginPage {...props} />);

    expect(el.find('.email-login')).to.have.length(1);
  });
});
