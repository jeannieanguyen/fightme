import sinon from 'sinon';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { LoginPage } from './login';
import { RegisterPage } from './index';
import { ConfirmPage } from './confirm';

describe('<LoginPage />', () => {
  const props = LoginPage.defaultProps;

  it('renders the LoginPage', () => {
    const el = shallow(<LoginPage {...props} />);

    expect(el).to.have.length(1);
  });

  it('renders an email input', () => {
    const el = shallow(<LoginPage {...props} />);

    expect(el.find('.email-login')).to.have.length(1);
  });

  it('calls loginUser() when the Login button is clicked', () => {
    const loginUser = sinon.spy();
    const el = shallow(<LoginPage {...props} />);
    el.setProps({ loginUser });
    el.find('button.login-btn').simulate('click');
    expect(loginUser.calledOnce).to.equal(true);
  });
});

describe('<RegisterPage />', () => {
  it('renders the Reigster Page', () => {
    const el = shallow(<RegisterPage />);

    expect(el).to.have.length(1);
  });
});

describe('<ConfirmPage />', () => {
  const props = ConfirmPage.defaultProps;
  it('renders the Confirmation Page', () => {
    const el = shallow(<ConfirmPage />);

    expect(el).to.have.length(1);
  });

  it('calls confirm whtn the confirm button is clicked', () => {
    const confirmUserEmail = sinon.spy();
    const el = shallow(<ConfirmPage {...props} />);
    el.setProps({ confirmUserEmail });
    el.find('button.confirm-btn').simulate('click');
    expect(confirmUserEmail.calledOnce).to.equal(true);
  });
});

