use molru;

select * from user;

insert into user (user_id, created_date, modified_date, address, image_url, nickname) value (1, now(), now(), "0x4e177f5BfaA216c4605b24449a4155e4FcCf8806", "test1@test1.com", "bing1");
insert into user (user_id, created_date, modified_date, address, image_url, nickname) value (2, now(), now(), "0x1DFDAA54aFA540f4df086F44d4b3471f80530D9e", "test2@test2.com", "bing2");
insert into user (user_id, created_date, modified_date, address, image_url, nickname) value (3, now(), now(), "0x74165381953211Bc861650e84b626A56a4486C99", "test3@test3.com", "bing3");

select * from nft;

insert into nft (nft_id, created_date, modified_date, audio_path, category, image_path, on_sale, token_contract_address, token_description, token_hash, token_id, token_title, owner_id) value (1, now(), now(), '/resource/nft/CA,B,dC,edf\'Ba\'aGd\'BG,D,-15-music.wav', 'BRIGHT', '/resource/nft/CA,B,dC,edf\'Ba\'aGd\'BG,D,-15-img.svg', 0, '0x124deAD75F8472E4d2a5DcE2486aeC1ebEC5c882', 'momoruman', '085D99334D492F20BCB72C7E0867C7A0', 27, 'momoru', 3);
insert into nft (nft_id, created_date, modified_date, audio_path, category, image_path, on_sale, token_contract_address, token_description, token_hash, token_id, token_title, owner_id) value (2, now(), now(), '/resource/nft/F,AFfAAd\'AgEegA,DbF-46-music.wav', 'QUITE', '/resource/nft/F,AFfAAd\'AgEegA,DbF-46-img.svg', 0, '0x124deAD75F8472E4d2a5DcE2486aeC1ebEC5c882', 'kokomo', '1A1A5C5FCAB0DE9EEFDB415D218756D2', 28, 'mokoko', 2);
insert into nft (nft_id, created_date, modified_date, audio_path, category, image_path, on_sale, token_contract_address, token_description, token_hash, token_id, token_title, owner_id) value (3, now(), now(), '/resource/nft/EgeDggD,c\'e\'e\'F,gCg\'Fb-1-music.wav', 'HAPPY', '/resource/nft/EgeDggD,c\'e\'e\'F,gCg\'Fb-1-img.svg', 0, '0x124deAD75F8472E4d2a5DcE2486aeC1ebEC5c882', 'kakamu', '0B217D9F793F0FECEA77AED8BB430A62', 29, 'mukaka', 1);


