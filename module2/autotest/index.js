import { register, login, station, dispatch, booking, seat, profile } from './methods/index.js';

(async () => {
    await register.successful();
    await register.clean();
    await register.phone();
    await login.successful();
    await login.clean();
    await login.unauthorized();
    await station.successful();
    await station.noresults();
    await dispatch.successful();
    await dispatch.clean();
    await dispatch.validateId();
    await dispatch.validateDate();
    await dispatch.validatePassengers();
    await booking.successful();
    await booking.clean();
    await booking.validate();
    await booking.managment();
    await seat.place_success();
    await seat.get();
    await seat.occupied();
    await seat.forbidden();
    await seat.clean();
    await profile.unauthorized();
    await profile.success();
})();