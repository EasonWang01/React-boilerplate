import { useEffect, useState } from "react";
import styles from "./index.module.scss";
import SignUp from "./SignUp";
import EmailVerify from "./EmailVerify";

const Login = () => {

  const [step, setStep] = useState(0);
  return (
    <div className={styles.container}>
      <div className={styles.login_card}>
        {step === 0 && <SignUp setStep={setStep} />}
        {step === 1 && <EmailVerify setStep={setStep} />}
      </div>
    </div>
  );
};

export default Login;
