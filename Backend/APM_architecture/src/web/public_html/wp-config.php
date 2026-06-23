<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress_db' );

/** Database username */
define( 'DB_USER', 'wp_user' );

/** Database password */
define( 'DB_PASSWORD', '1231' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '++B_ku7|NPi,8RZ]m@8l!?p[{v3&m0(B^Va`vDWS;Y*i -o-mc%=(%3}/PL4`T_.');
define('SECURE_AUTH_KEY',  'W^%iYLHpiBpsajV|X!x}Vc|kXkLkZf#^qpv+M+LWFyiGkaaKEz;R#}rK H%]M%k7');
define('LOGGED_IN_KEY',    'QfOiXDb_?d{}fG8z*tJ*8=+}< d/cI[|fw CV0T&;mb*F-^sm6!?F$6J!(:Wl^yJ');
define('NONCE_KEY',        '<bgJ@,>C57w/_m.:X/x^Mp,zthBPH )}+6<GU$j<6)!| C.s+xO?.&@e^@uj`>f*');
define('AUTH_SALT',        '0qGWs2n{x]9$aMW6PW$Hl/-d(rXh}m+Zt ]U_a-h,*jgz@=7~#uLhvj*N+8 h+x;');
define('SECURE_AUTH_SALT', 'Q&bJaE @#7m`_Ljfk13NbPY!J^r#-y/&*5bOhs(]Qml1p 4aS_}HkG=FzQC++Gyy');
define('LOGGED_IN_SALT',   'TlJOM~Ns{E,yP7x/Pj>.|bL3L,i<Pz8&o 7,vAlL66mMl[7wYzjW#I{v|u<|B.%l');
define('NONCE_SALT',       '88,+z}e@xDP(,[rP,F03>#^.vPXT2+Zb%bl$I!MHn)Q;-.!~-d$Te?f,Tve-^q(/');

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';


// 관리자 페이지에서 파일 편집 비활성화
// (해커가 침입해도 코드 수정 불가)
define('DISALLOW_FILE_EDIT', true);

// WordPress 코어 자동 업데이트 활성화
// (보안 패치 자동 적용)
define('WP_AUTO_UPDATE_CORE', true);

// 디버그 모드 비활성화 (운영 환경)
// (에러 메시지 노출 방지)
define('WP_DEBUG', false);
define('WP_DEBUG_LOG', false);
define('WP_DEBUG_DISPLAY', false);
