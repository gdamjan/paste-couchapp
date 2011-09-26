function (newDoc, oldDoc, userCtx) {

  if (userCtx.roles.indexOf('_admin') != -1) {
    return;
  }

  if( oldDoc !== null ) {
    throw {
      forbidden: "existing pastes cannot be changed."
    };
  }

  if( !(newDoc.title && newDoc.content ) ) {
    throw {
      forbidden: "Cannot post empty paste"
    };
  }

  return true;
}
