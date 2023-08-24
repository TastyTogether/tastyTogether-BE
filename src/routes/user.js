const { Router } = require('express');
const userController = require('../services/user');

const router = Router();

// 프로필 수정 api O
router.patch('/:userId', userController.editUser);

// 유저 탈퇴 api O
router.delete('/:userId', userController.deleteUser);

// 리뷰 목록 조회 api O
router.get('/reviews', userController.getMyReviews);

// 특정 사용자가 작성한 리뷰들 조회 O
router.get('/:userId/reviews', userController.getUserReviews);

// (마이페이지) 가게 찜 목록 조회 api => /store/likes/:userId
router.get('/likes/:userId', userController.getStoreLikes);

// (마이페이지) 가게 찜 삭제 api => /store/like/:userId
router.delete('/:userid/storelikes/:storeid', userController.deleteStoreLike);

// (마이페이지) 게시글 목록 조회 api => /boards/:userId X
router.get('/boards/:userid', userController.getBoards);

// 추가) 라이크 후순위 작업

module.exports = router;
