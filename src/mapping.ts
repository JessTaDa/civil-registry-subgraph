import { BigInt } from "@graphprotocol/graph-ts"
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
import { ExampleEntity } from "../generated/schema"

export function handle_AppealRequested(event: _AppealRequested): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity == null) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.listingAddress = event.params.listingAddress
  entity.challengeID = event.params.challengeID

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.name(...)
  // - contract.appealChallengeCanBeResolved(...)
  // - contract.challengeGrantedAppeal(...)
  // - contract.civilVoting(...)
  // - contract.appealCanBeResolved(...)
  // - contract.government(...)
  // - contract.challengeCanBeResolved(...)
  // - contract.isWhitelisted(...)
  // - contract.appWasMade(...)
  // - contract.challengeRequestAppealExpiries(...)
  // - contract.listings(...)
  // - contract.challengeExists(...)
  // - contract.challenges(...)
  // - contract.tokenClaims(...)
  // - contract.voterReward(...)
  // - contract.appeals(...)
  // - contract.challenge(...)
  // - contract.determineReward(...)
  // - contract.canBeWhitelisted(...)
  // - contract.parameterizer(...)
  // - contract.token(...)
  // - contract.voting(...)
}

export function handle_AppealGranted(event: _AppealGranted): void {}

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
