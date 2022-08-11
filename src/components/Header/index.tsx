import { useContext } from "react";
// import { UsuarioContext } from "../../context/UsuarioContext";
import format from "date-fns/format";
import ptBR from "date-fns/locale/pt-BR";
import { Image, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import Link from "next/link";

type Props = {
  login: boolean;
};

export function Header(props: Props) {
  const dataAtual = format(new Date(), "EEEEEE, d MMMM", {
    locale: ptBR,
  });

  return (
    <header className={styles.headerContainer}>
      <div className={styles.menuContainer}>
        <Link href={`/home`}>
          <h2>Início</h2>
        </Link>
        <Link href={`/home`}>
          <h2>Início</h2>
        </Link>
        <Link href={`/home`}>
          <h2>Início</h2>
        </Link>
      </div>
    </header>
  );
}
