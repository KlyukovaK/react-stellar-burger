import React from "react";
import personalAccountStyles from "./personal-account.module.css";

type TPersonalAccount = {
  title: string;
  children: JSX.Element;
  onFormSubmit(e: React.SyntheticEvent): void;
};
export function PersonalAccount({
  title,
  children,
  onFormSubmit,
}: TPersonalAccount) {
  return (
    <main className={personalAccountStyles.main}>
      <h1 className="text text_type_main-medium mb-6">{title}</h1>
      <form className={personalAccountStyles.children} onSubmit={onFormSubmit}>
        {children}
      </form>
    </main>
  );
}
