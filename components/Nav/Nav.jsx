import styles from "../../styles/Nav.module.scss";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import { getDiscord } from "../../helpers/serverAuth.js";
import User from "./User";
import { useDiscord } from "../../context/DiscordContext";
import Link from "next/link";

function Nav() {
  const router = useRouter();
  const { code } = router.query;
  const { checkUpdates } = useDiscord();

  useEffect(() => {
    if (code) {
      checkDiscordName(code);
    }
  }, [code]);

  async function checkDiscordName(code) {
    let { info, oauthData } = await getDiscord(code);

    localStorage.setItem('discordInfo', JSON.stringify(info));
    localStorage.setItem('oauthData', JSON.stringify(oauthData));
    checkUpdates();
  };

  return (
    <nav className={styles.nav}>
      <Link className="flex white-color" href="/">
        <img src="/img/emerald_logo.png" alt="EmeraldID Logo" />
        <h1>EmeraldID</h1>
      </Link>
      <User />
    </nav>
  )
}

export default Nav;