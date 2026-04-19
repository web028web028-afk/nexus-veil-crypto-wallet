import hashlib
import secrets
import base64

class WalletSecurityEncryptor:
    def __init__(self):
        self.hash_algorithm = hashlib.sha256
        self.salt_length = 16

    def generate_secure_salt(self):
        return secrets.token_hex(self.salt_length)

    def encrypt_private_key(self, private_key, password):
        salt = self.generate_secure_salt()
        combined = password.encode() + salt.encode() + private_key.encode()
        encrypted = self.hash_algorithm(combined).hexdigest()
        return f"{salt}:{encrypted}"

    def verify_encrypted_data(self, original_key, encrypted_data, password):
        parts = encrypted_data.split(':')
        if len(parts) != 2:
            return False
        salt, stored_hash = parts
        combined = password.encode() + salt.encode() + original_key.encode()
        computed_hash = self.hash_algorithm(combined).hexdigest()
        return computed_hash == stored_hash

    def generate_secure_nonce(self):
        return base64.b64encode(secrets.token_bytes(12)).decode('utf-8')

encryptor = WalletSecurityEncryptor()
