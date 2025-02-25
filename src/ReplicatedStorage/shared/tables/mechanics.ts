import {
  ClientNetworkEvents,
  ServerNetworkEvents,
} from 'ReplicatedStorage/shared/network'
import { ArcadeTableState } from 'ReplicatedStorage/shared/state/ArcadeTablesState'
import { AirHockeyMechanics } from 'ReplicatedStorage/shared/tables/airhockey'
import { FoosballMechanics } from 'ReplicatedStorage/shared/tables/foosball'
import { PinballMechanics } from 'ReplicatedStorage/shared/tables/pinball'
import { BehaviorObject } from 'ReplicatedStorage/shared/utils/behavior'

export interface ArcadeControllerInterface {
  myArcadeTableName: ArcadeTableName | undefined
  leftDown: boolean
  rightDown: boolean
  forwardDown: boolean
  backwardDown: boolean
}

export interface ArcadeTableMechanics {
  onSetupTable(arcadeTable: ArcadeTable, state: ArcadeTableState): void

  onCreateTablePart(
    arcadeTable: ArcadeTable,
    state: ArcadeTableState,
    part: BasePart,
  ): void

  onGameStart(
    tableName: ArcadeTableName,
    userId: number,
    network: ServerNetworkEvents,
  ): void

  onGameOver(tableName: ArcadeTableName, userId: number): void

  onEvent(arcadeTable: ArcadeTable, eventName: string, part?: Instance): void

  onScoreChanged(
    tableName: ArcadeTableName,
    arcadeTableState: ArcadeTableState,
  ): void

  onClientInputBegan(
    tableName: ArcadeTableName,
    controller: ArcadeControllerInterface,
    network: ClientNetworkEvents,
    input: InputObject,
    inputService?: UserInputService,
  ): void

  onClientInputEnded(
    tableName: ArcadeTableName,
    controller: ArcadeControllerInterface,
    network: ClientNetworkEvents,
    input: InputObject,
    inputService?: UserInputService,
  ): void

  onClientNewPiece(
    tableName: ArcadeTableName,
    pieceType: string,
    pieceName: string,
  ): void

  onNPCPlayingBehavior(
    tableName: ArcadeTableName,
    userId: number,
    obj: BehaviorObject,
  ): void
}

export const mechanics: Record<ArcadeTableType, ArcadeTableMechanics> = {
  AirHockey: new AirHockeyMechanics(),
  Foosball: new FoosballMechanics(),
  Pinball: new PinballMechanics(),
}
