import { useSkin } from "@hooks/useSkin";
import { Link } from "react-router-dom";
import { ChevronLeft } from "react-feather";
import InputPassword from "@components/input-password-toggle";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  FormGroup,
  Label,
  Button,
} from "reactstrap";
import "@styles/base/pages/page-auth.scss";

const ResetPassword = () => {
  const [skin] = useSkin();

  const illustration =
      skin === "dark" ? "reset-password-v2-dark.svg" : "reset-password-v2.svg",
    source = require(`@src/assets/images/pages/${illustration}`).default;

  return (
    <div className="auth-wrapper auth-v2">
      <Row className="auth-inner m-0">
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login V2" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle
              tag="h2"
              className="mb-1"
              style={{
                fontFamily: "Nunito Sans, sans-serif",
                fontWeight: "600",
              }}
            >
              RESET PASSWORD 🔒
            </CardTitle>
            <CardText
              className="mb-2"
              style={{
                fontFamily: "Nunito Sans, sans-serif",
                fontWeight: "500",
              }}
            >
              Your new password must be different from previously used passwords
            </CardText>
            <Form
              className="auth-reset-password-form mt-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <FormGroup>
                <Label className="form-label" for="new-password">
                  New Password
                </Label>
                <InputPassword
                  className="input-group-merge"
                  id="new-password"
                  autoFocus
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="confirm-password">
                  Confirm Password
                </Label>
                <InputPassword
                  className="input-group-merge"
                  id="confirm-password"
                />
              </FormGroup>
              <Button.Ripple color="primary" block>
                Set New Password
              </Button.Ripple>
            </Form>
            <p
              className="text-center mt-2"
              style={{
                fontFamily: "Nunito Sans, sans-serif",
                fontWeight: "400",
              }}
            >
              <Link to="/login">
                <ChevronLeft className="mr-25" size={14} />
                <span className="align-middle">Back to login</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;