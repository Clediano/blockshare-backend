const express = require('express');
const routes = express.Router();

const multer = require('multer');
const uploadConfig = require('./config/upload');
const upload = multer(uploadConfig);

const TransactionController = require('./controllers/organization/transaction');
const WalletController = require('./controllers/organization/wallet');
const UserController = require('./controllers/authentication/user');
const UserAvatarController = require('./controllers/organization/avatar');
const AuthOrganizationController = require('./controllers/authentication/organization');
const NotificationController = require('./controllers/organization/notification');
const OrganizationSearchController = require('./controllers/organization/search');
const ArchiveController = require('./controllers/archive/archive');
const FriendController = require('./controllers/organization/friend');
const DashboardController = require('./controllers/dashboard/document');

const AuthenticationService = require('./services/security/security.token');

//Organization
routes.post('/organization', AuthOrganizationController.createOrganization);
routes.get('/organization/:organizationid/wallet', WalletController.findByOrganizationId);
routes.get('/organization/:organizationid', AuthenticationService.authorize, OrganizationSearchController.findById);

routes.get('/organization/:organizationid/notifications', AuthenticationService.authorize, NotificationController.searchAll);
routes.get('/organization/:organizationid/notifications/total', AuthenticationService.authorize, NotificationController.countNotifications);
routes.post('/organization/:organizationid/notifications/:notificationid/reject', AuthenticationService.authorize, NotificationController.rejectSolicitaion);
routes.post('/organization/:organizationid/notifications/:notificationid/accept', AuthenticationService.authorize, NotificationController.acceptSolicitaion);

routes.get('/organization/:organizationid/shared/all/:offset/:limit', AuthenticationService.authorize, FriendController.findAllSharedOrganizations);
routes.get('/organization/:organizationid/shared/all/emails', AuthenticationService.authorize, FriendController.findAllSharedEmailOrganizations);
routes.get('/organization/:organizationid/shared/name/:text/:offset/:limit', AuthenticationService.authorize, FriendController.findSharedOrganizationByName);
routes.get('/organization/:organizationid/shared/email/:text/:offset/:limit', AuthenticationService.authorize, FriendController.findSharedOrganizationByEmail);

routes.get('/organization/:organizationid/search/name/:text/:offset/:limit', AuthenticationService.authorize, OrganizationSearchController.findByName);
routes.get('/organization/:organizationid/search/address/:text/:offset/:limit', AuthenticationService.authorize, OrganizationSearchController.findByAddress);

routes.post('/organization/invite', AuthenticationService.authorize, FriendController.sendInvite);
routes.get('/organization/address/:address', AuthenticationService.authorize, WalletController.getAddressDetails);

//User
routes.post('/user/:organizationid', UserController.createUser);
routes.get('/users/:organizationid', UserController.listUsers);
routes.post('/avatar', AuthenticationService.authorize, upload.single('file'), UserAvatarController.updateAvatar);
routes.delete('/avatar/:avatarid', AuthenticationService.authorize, UserAvatarController.removeAvatar);

routes.post('/authentication', UserController.authenticate);

//Transactions
routes.post('/transaction', AuthenticationService.authorize, upload.single('file'), TransactionController.createTransaction);
routes.post('/transaction/share', AuthenticationService.authorize, upload.single('file'), TransactionController.createTransactionAndShareDocument);
routes.get('/transactions/organization/:organizationid/:offset/:limit', AuthenticationService.authorize, TransactionController.getAllTransactions);
routes.get('/transactions/organization/:organizationid/search/txid/:text/:offset/:limit', AuthenticationService.authorize, TransactionController.findTransactionByTxid);
routes.get('/transactions/fee', AuthenticationService.authorize, TransactionController.getTransactionFee);

//Archives
routes.post('/archive', AuthenticationService.authorize, upload.single('file'), ArchiveController.upload);
routes.get('/archive/:id', AuthenticationService.authorize, ArchiveController.findById);
routes.delete('/archive/:id', AuthenticationService.authorize, ArchiveController.delete);

//Dashboard
routes.get('/dashboard/count_number_of_documents_not_registred/:organizationid', AuthenticationService.authorize, DashboardController.countNumberOfDocumentsNotRegistred);
routes.get('/dashboard/count_number_of_documents_registred/:organizationid', AuthenticationService.authorize, DashboardController.countNumberOfDocumentsRegistred);
routes.get('/dashboard/count_number_of_friends/:organizationid', AuthenticationService.authorize, DashboardController.countNumberOfFriends);
routes.get('/dashboard/count_number_total_of_documents/:organizationid', AuthenticationService.authorize, DashboardController.countNumberTotalOfDocuments);
routes.get('/dashboard/documents_by_period/:organizationid', AuthenticationService.authorize, DashboardController.documentsByPeriod);


module.exports = routes;
