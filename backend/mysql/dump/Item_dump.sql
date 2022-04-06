/*
-- Query: select * from items
LIMIT 0, 1000

-- Date: 2022-04-06 04:40
*/

use `molru`;
INSERT INTO `nft` (`nft_id`,`token_id`,`token_hash`,`token_title`,`token_description`,`owner_id`,`created_date`)
VALUES
(1,1,'xri8lWS/MDyP1W3KfVTP3Ye6vLSK7BiNXtBLg4UKULI4fCiliB1rh5l2cHAlAYanaLtVfHeJikkg7melamSa9Q==','me1','me123',0,'2022-04-06 04:32:36'),
(2,2,'4XExsHcxE9qSP27GySD2L+kEByMrW5Km1hM1sRDz+9SOEhBYlBwaX1+rdkozeHHUhM7GklUq7yMY7IeRvzyG0g==','me2','me2',0,'2022-04-06 04:32:48'),
(3,3,'S5gzILfTpi1ebJ37OdXqNt3cUpK0N2Z9j+q6LNGNRLRml2MdewzI4NKX/wRsSLrX4CXZSFulo0NueBntT9ijTA==','me3','me3',0,'2022-04-06 04:32:58'),
(4,4,'nZYERFtIi+iWN+Cs9hyG3+gaPFVSrbrF22DaautDUB7zPkBPEoP+0ThgT3LQtLGqIPHRCY0tdMFrJB3wRQrddw==','you1','you1',1,'2022-04-06 04:33:09'),
(5,NULL,'HZ7ERvrfdOwss7NrgGIHlzElw4Zh7kDc93YA9QyNjIczRgLaoPEdZMJt04s+EIRi6ipLV+MX8DZ2JJm3RlXwQQ==','you2','you2',1,'2022-04-06 04:34:33'),
(6,5,'bJO3BsrnVQCbl9CbVQz5ib9q7cO3jp644I0FDiorGYVpnI7P61QLwfi0FlPbTA1Ogu96+ed+voqo4CxI6ASp7Q==','ano1','ano1',2,'2022-04-06 04:35:01'),
(7,6,'4tb3GCf/fYRJT/vTq5jB6XVUExtKnBTpRf1nwlRt8KDb58rUgzbW65VIjPXbdv3+glNjkLVwZHs/tsn1Wq8a5Q==','ano2','ano2',2,'2022-04-06 04:35:13'),
(8,7,'TJ3SPHYGOZJP2dgbbOcY+a8cY9+YlIUZ2JQKIYawxUVuviYBzjs1H8oGZCiDYqEKCFdjhVmg8sDETcOmccGezQ==','ano3','ano3',2,'2022-04-06 04:35:33');
