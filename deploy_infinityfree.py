import os
import sys
import getpass
from ftplib import FTP

FTP_HOST = "ftpupload.net"
FTP_USER = "if0_42594340"
REMOTE_TARGET = "MovGenZ.site.je/htdocs"
LOCAL_DIR = os.path.join(os.path.dirname(__file__), "dist")

def upload_directory(ftp, local_dir, remote_dir):
    print(f"Navigating to remote directory: {remote_dir}")
    parts = remote_dir.strip("/").split("/")
    ftp.cwd("/")
    for part in parts:
        try:
            ftp.cwd(part)
        except Exception:
            try:
                ftp.mkd(part)
                ftp.cwd(part)
            except Exception as e:
                print(f"Error creating/entering {part}: {e}")

    for root, dirs, files in os.walk(local_dir):
        rel_path = os.path.relpath(root, local_dir).replace("\\", "/")
        if rel_path == ".":
            target_cwd = "/" + "/".join(parts)
        else:
            target_cwd = "/" + "/".join(parts) + "/" + rel_path

        ftp.cwd("/")
        for p in target_cwd.strip("/").split("/"):
            try:
                ftp.cwd(p)
            except Exception:
                try:
                    ftp.mkd(p)
                    ftp.cwd(p)
                except Exception as e:
                    print(f"Directory error for {p}: {e}")

        for f in files:
            local_file = os.path.join(root, f)
            print(f"Uploading {f} -> {target_cwd}...")
            with open(local_file, "rb") as fp:
                ftp.storbinary(f"STOR {f}", fp)

def main():
    if len(sys.argv) > 1:
        password = sys.argv[1]
    else:
        password = os.environ.get("INFINITYFREE_PASSWORD") or getpass.getpass("Enter InfinityFree FTP Password: ")

    if not password:
        print("Error: Password is required.")
        sys.exit(1)

    print(f"Connecting to FTP {FTP_HOST} as {FTP_USER}...")
    try:
        ftp = FTP(FTP_HOST, timeout=30)
    except Exception:
        print("Falling back to IP 185.27.134.176...")
        ftp = FTP("185.27.134.176", timeout=30)

    ftp.login(user=FTP_USER, passwd=password)
    print("Logged in successfully!")

    upload_directory(ftp, LOCAL_DIR, REMOTE_TARGET)
    ftp.quit()
    print("\n✅ Deployment complete! Your site is live at http://movgenz.site.je/")

if __name__ == "__main__":
    main()
