-- Seed data (demo logins: admin/admin123, staff/staff123, dean/dean123)
INSERT INTO users (username, password_hash, full_name, role) VALUES
('admin', '$2y$10$4O.CRdz.sC/2N7jT1CepReAiufUvOiY3cxTjPfJT2EcrC41EHj5GW', 'Maria Santos', 'admin'),
('staff', '$2y$10$JB1X192dr.DI7npwgkjQ2O/sPgHaEGRaBEhscP0sFA8dBx17hW5GW', 'Jose Reyes', 'staff'),
('dean',  '$2y$10$r/Jn.V.IV1sqPRUXaNE8yuUyAIneMZ1oJhe4pCgy3l/XrkVyX9bE6', 'Dr. Elena Villanueva', 'dean');

INSERT INTO programs (program_code, program_name) VALUES
('BSCS', 'Bachelor of Science in Computer Science'),
('BSIT', 'Bachelor of Science in Information Technology');