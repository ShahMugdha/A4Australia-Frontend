//import { useSkin } from "@hooks/useSkin";
import { Link } from "react-router-dom";
import { ChevronLeft } from "react-feather";
//import InputPassword from "@components/input-password-toggle";
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Input,
  Form,
  FormGroup,
  Label,
  Button,
} from "reactstrap";


const ResetPassword = () => {
  return (
    <div>
      <Row className="auth-inner m-0">
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
                <Input
                  className="input-group-merge"
                  id="new-password"
                  autoFocus
                />
              </FormGroup>
              <FormGroup>
                <Label className="form-label" for="confirm-password">
                  Confirm Password
                </Label>
                <Input
                  className="input-group-merge"
                  id="confirm-password"
                />
              </FormGroup>
              <Button color="primary" block>
                Set New Password
              </Button>
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