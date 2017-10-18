import { shallow } from 'enzyme';
import { LoginPage } from './login';
import { RegisterPage } from './index';

describe('Login Page Component', () => {
  const props = LoginPage.defaultProps;

  it('renders the LoginPage', () => {
    const el = shallow(<LoginPage {...props} />);

    expect(el).to.have.length(1);
  });

  it('renders an email input', () => {
    const el = shallow(<LoginPage {...props} />);

    expect(el.find('.email-login')).to.have.length(1);
  });
});

describe('Register Page Component', () => {
  it('renders the Reigster Page', () => {
    const el = shallow(<RegisterPage />);

    expect(el).to.have.length(1);
  });
});
