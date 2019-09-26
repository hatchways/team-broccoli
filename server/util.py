import hashlib

def scrypt(password:str, salt:bytes) -> bytes:
    return hashlib.scrypt(
        bytes(password, 'utf-8'),
        salt=salt,
        # n, r, and p values should be adjusted based on the abilities
        # of contemporary computers. These values come from the golang
        # recommendations: https://godoc.org/golang.org/x/crypto/scrypt
        n=2**15, r=8, p=1,
        maxmem=2**26
    )
