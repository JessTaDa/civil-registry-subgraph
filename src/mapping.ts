import { EthereumEvent, BigInt, log } from "@graphprotocol/graph-ts"
import {
  Contract,
  _AppealRequested,
  _AppealGranted,
  _FailedChallengeOverturned,
  _SuccessfulChallengeOverturned,
  _GrantedAppealChallenged,
  _GrantedAppealOverturned,
  _GrantedAppealConfirmed,
  _GovernmentTransfered,
  _Application,
  _Challenge,
  _Deposit,
  _Withdrawal,
  _ApplicationWhitelisted,
  _ApplicationRemoved,
  _ListingRemoved,
  _ListingWithdrawn,
  _TouchAndRemoved,
  _ChallengeFailed,
  _ChallengeSucceeded,
  _RewardClaimed
} from "../generated/Contract/Contract"
import { Appeal, User } from "../generated/schema"

// @param listingAddress The hash of a potential listing a user is applying to add to the registry
// Appeal appeal = appeals[challengeID];

function createUser(event: EthereumEvent) {
  let user = User.load(event.transaction.from.toHex())
  if (user == null) {
    new User(event.transaction.from.toHex())
    user.address = event.transaction.from
    user.requestedAppeals = new Array<string>()
    user.ownedListings = new Array<string>()
    user.ownedChallenges = new Array<string>()
  }
  user.save()
  return user
}

export function handle_AppealRequested(event: _AppealRequested): void {
  let contract = Contract.bind(event.address)
  let appealData = contract.appeals(event.params.challengeID)
  let entity = Appeal.load(event.transaction.from.toHex())
  if (entity == null) {
    entity = new Appeal(event.transaction.from.toHex())
    entity.appealPhaseExpiry = appealData.value2
    entity.appealGranted = appealData.value3
    entity.appealOpenToChallengeExpiry = appealData.value4
    entity.overturned = appealData.value6
    // entity.requester = appealData.value0
  }
  let user = createUser(event)
  // entity.requester = event.params.requester
  entity.requester = user
  entity.appealFeePaid = event.params.appealFeePaid
  entity.appealChallengeID = event.params.challengeID
  entity.listingAddress = event.params.listingAddress
  entity.save()
  event.params.data.toString().
}

export function handle_AppealGranted(event: _AppealGranted): void {
  let contract = Contract.bind(event.address)
  let appealData = contract.appeals(event.params.challengeID)
  let entity = Appeal.load(event.transaction.from.toHex())
  if (entity == null) {
    createUser(event)
    entity = new Appeal(event.transaction.from.toHex())
    entity.requester = appealData.value0
    entity.appealFeePaid = appealData.value1 
    entity.appealPhaseExpiry = appealData.value2
    entity.appealGranted = appealData.value3
    entity.appealOpenToChallengeExpiry = appealData.value4
    entity.overturned = appealData.value6
  }
  entity.appealChallengeID = event.params.challengeID
  entity.listingAddress = event.params.listingAddress
  log.info("event.params.data", [event.params.data.toString()])
  entity.save()
}


export function handle_FailedChallengeOverturned(
  event: _FailedChallengeOverturned
): void {}

export function handle_SuccessfulChallengeOverturned(
  event: _SuccessfulChallengeOverturned
): void {}

export function handle_GrantedAppealChallenged(
  event: _GrantedAppealChallenged
): void {}

export function handle_GrantedAppealOverturned(
  event: _GrantedAppealOverturned
): void {}

export function handle_GrantedAppealConfirmed(
  event: _GrantedAppealConfirmed
): void {}

export function handle_GovernmentTransfered(
  event: _GovernmentTransfered
): void {}

export function handle_Application(event: _Application): void {}

export function handle_Challenge(event: _Challenge): void {}

export function handle_Deposit(event: _Deposit): void {}

export function handle_Withdrawal(event: _Withdrawal): void {}

export function handle_ApplicationWhitelisted(
  event: _ApplicationWhitelisted
): void {}

export function handle_ApplicationRemoved(event: _ApplicationRemoved): void {}

export function handle_ListingRemoved(event: _ListingRemoved): void {}

export function handle_ListingWithdrawn(event: _ListingWithdrawn): void {}

export function handle_TouchAndRemoved(event: _TouchAndRemoved): void {}

export function handle_ChallengeFailed(event: _ChallengeFailed): void {}

export function handle_ChallengeSucceeded(event: _ChallengeSucceeded): void {}

export function handle_RewardClaimed(event: _RewardClaimed): void {}

